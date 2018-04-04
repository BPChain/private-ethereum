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
import os
from functools import reduce

import yaml
from web3 import Web3, HTTPProvider
from websocket import create_connection, WebSocket


def connect_to_blockchain():
    web3 = Web3(HTTPProvider('http://127.0.0.1:8546',
                             request_kwargs={'timeout': 120}))
    while not web3.isConnected():
        time.sleep(1)
    return web3


def start_mining(web3):
    web3.miner.start(1)

def unlock_account(web3):
    web3.personal.unlockAccount(web3.eth.accounts[0], "123", 0)

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
    # first block might be genesis block with timestamp 0. this has to be catched.
    if last_sent_block is None or not blocks_to_send:
        return 0
    blocks_to_send = [last_sent_block] + blocks_to_send
    deltas = [next.timestamp - current.timestamp for current, next in zip(blocks_to_send,
                                                                          blocks_to_send[1:])]
    return sum(deltas) / len(deltas)


def provide_data_every(n_seconds, web3, hostname):
    number_of_last_block = 0
    node_data = {"avgDifficulty": 0, "avgBlocktime": 0}
    while True:
        time.sleep(n_seconds)
        try:
            number_of_last_block, node_data = provide_data(number_of_last_block, node_data, web3, hostname)
            send_data(node_data)
        # pylint: disable=broad-except
        except Exception as exception:
            print("During providing Data an error occurred: '%s'" % exception)
            logging.critical({"message": exception})


def provide_data(last_block_number, old_node_data, web3, hostname):
    last_sent_block = web3.eth.getBlock(last_block_number) if last_block_number > 0 else None
    new_last_block_number, blocks_to_send = retrieve_new_blocks_since(last_block_number, web3)
    node_data = get_node_data(blocks_to_send, last_sent_block, web3, hostname)
    if new_last_block_number == last_block_number or last_block_number == 0:
        node_data["avgDifficulty"] = old_node_data["avgDifficulty"]
        node_data["avgBlocktime"] = old_node_data["avgBlocktime"]
        logging.critical({"message": 'Old averages where used'})
    print(node_data)
    last_block_number = new_last_block_number
    return last_block_number, node_data


def get_node_data(blocks_to_send, last_sent_block, web3, hostname):

    avg_block_difficulty = calculate_avg_block_difficulty(blocks_to_send)
    avg_block_time = calculate_avg_block_time(blocks_to_send, last_sent_block)
    host_id = web3.admin.nodeInfo.id
    hash_rate = web3.eth.hashrate
    gas_price = web3.eth.gasPrice
    is_mining = 1 if web3.eth.mining else 0
    node_data = {"chainName": "ethereum", "hostId": host_id, "hashrate": hash_rate,
                 "gasPrice": gas_price,
                 "avgDifficulty": avg_block_difficulty, "avgBlocktime": avg_block_time,
                 "isMining": is_mining, "target": hostname}
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
    hostname = os.environ["TARGET_HOSTNAME"]
    send_period = 10
    web3_connector = connect_to_blockchain()
    setup_logging()
    unlock_account(web3_connector)
    start_mining(web3_connector)
    provide_data_every(send_period, web3_connector, hostname)


if __name__ == "__main__":
    main()
