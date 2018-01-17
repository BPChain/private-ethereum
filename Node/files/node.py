""" I read values from my local blockchain node by using the Web3 Library which uses the nodes
    RPC-API.
    Make sure the required apis are unlocked in geth. I send the values I read to a server in a
    specified interval via a secure websocket. This can be configured in the config.yml.
    Important variable is SEND_PERIOD which defines how often . The values I send can currently be
    seen in gather_data"""

import json
import logging
import time
import subprocess
from functools import reduce

import yaml
from web3 import Web3, HTTPProvider
from websocket import create_connection, WebSocket


def connect_to_blockchain():
    web3 = Web3(HTTPProvider('http://localhost:8545',
                             request_kwargs={'timeout': 120}))
    while not web3.isConnected():
        time.sleep(1)
    return web3


def start_mining(web3):
    web3.miner.start(1)


def retrieve_new_blocks_since(number_of_last_sent_block, web3):
    """Gets the newly mined blocks since last send cycle"""
    new_blocks = []
    number_of_last_block = web3.eth.getBlock('latest').number
    if number_of_last_block > number_of_last_sent_block:
        number_of_blocks_to_send = number_of_last_block - number_of_last_sent_block
        for i in range(1, number_of_blocks_to_send + 1):
            new_blocks.append(web3.eth.getBlock(number_of_last_sent_block + i))
        return number_of_last_block, new_blocks
    else:
        return number_of_last_sent_block, new_blocks


def calculate_avg_block_difficulty(blocks_to_send):
    if not blocks_to_send:
        return 0
    else:
        return reduce((lambda accum, block: accum + block.difficulty), blocks_to_send, 0) / len(
            blocks_to_send)


def calculate_avg_block_time(blocks_to_send, last_sent_block):
    blocks_to_send = [last_sent_block] + blocks_to_send
    # first block might be genesis block with timestamp 0. this has to be catched.
    if len(blocks_to_send) == 1:
        return 0
    else:
        if blocks_to_send[0] is None:
            blocks_to_send.remove(None)
        if len(blocks_to_send) == 1:
            return 0
        deltas = [next.timestamp - current.timestamp for current, next in
                  zip(blocks_to_send, blocks_to_send[1:])]
        return sum(deltas) / len(deltas)


def provide_data_every(n_seconds, web3):
    last_block_number = 0
    while True:
        time.sleep(n_seconds)
        try:
            last_block_number = provide_data(last_block_number, web3)
        # pylint: disable=broad-except
        except Exception as exception:
            print("During providing Data an error occurred: '%s'" % exception)
            logging.critical({"message": exception})


def provide_data(last_block_number, web3):
    last_sent_block = web3.eth.getBlock(
        last_block_number) if last_block_number > 0 else None
    new_last_block_number, blocks_to_send = retrieve_new_blocks_since(
        last_block_number, web3)
    last_block_number = new_last_block_number
    node_data = gather_data(blocks_to_send, last_sent_block, web3)
    print(node_data)
    send_data(node_data)
    return last_block_number


def gather_data(blocks_to_send, last_sent_block, web3):
    avg_block_difficulty = calculate_avg_block_difficulty(blocks_to_send)
    avg_block_time = calculate_avg_block_time(blocks_to_send, last_sent_block)
    host_id = web3.admin.nodeInfo.id
    hash_rate = web3.eth.hashrate
    gas_price = web3.eth.gasPrice
    is_mining = 1 if web3.eth.mining else 0
    node_data = {"hostId": host_id, "hashrate": hash_rate, "gasPrice": gas_price,
                 "avgDifficulty": avg_block_difficulty, "avgBlocktime": avg_block_time,
                 "isMining": is_mining}
    return node_data


def create_web_socket() -> WebSocket:
    uri = yaml.safe_load(open("/root/files/config.yml"))
    timeout_in_seconds = 10
    web_socket = create_connection(
        uri['networking']['socketProtocol'] +
        uri['networking']['socketAdress'],
        timeout_in_seconds
    )
    logging.critical({"message": "Connection established"})
    return web_socket


def send_data(node_data):
    try:
        web_socket = create_web_socket()
        web_socket.send(json.dumps(node_data))
        print("Sent\nReceiving...")
        result = web_socket.recv()
        print("Received '%s'" % result)
        logging.critical({"message": result})
        web_socket.close()
    # Not nice, but works for now.
    # pylint: disable=broad-except
    except Exception as exception:
        print("Exception occurred during sending: ")
        print(exception)
        logging.critical({"message": exception})


def setup_logging():
    process = subprocess.Popen("hostname", stdout=subprocess.PIPE, shell=True)
    output, _ = process.communicate()
    logging.basicConfig(filename='/logging/' + str(output, "utf-8")[:-1] + '_private_ethereum.log',
                        level=logging.CRITICAL,
                        format='%(asctime)s %(message)s')


def main():
    send_period = 10
    web3_connector = connect_to_blockchain()
    setup_logging()
    start_mining(web3_connector)
    provide_data_every(send_period, web3_connector)


if __name__ == "__main__":
    main()
