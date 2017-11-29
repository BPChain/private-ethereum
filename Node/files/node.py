"""I read values from my local blockchain node by using the Web3 Library which uses the nodes RPC-API. Make sure the
    required apis are unlocked in geth. I send the values I read to a server in a specified interval via a http post.
    Important variables are SERVER_ADDRESS and SEND_PERIOD. The values I send can currently be seen in gather_data"""

import time
from web3 import Web3, HTTPProvider
import requests
import netifaces as ni
from functools import reduce


def connect_to_blockchain():
    web3 = Web3(HTTPProvider('http://localhost:8545'))
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
        print(blocks_to_send)
        return reduce((lambda accum, block: accum + block.timestamp), blocks_to_send, 0) / len(blocks_to_send)


def calculate_avg_block_time(blocks_to_send, last_sent_block):
    blocks_to_send = [last_sent_block] + blocks_to_send
    if len(blocks_to_send) == 1:
        return 0
    else:
        if blocks_to_send[0] is None:
            blocks_to_send.remove(None)
        if len(blocks_to_send) == 1:
            return 0
        for block in blocks_to_send:
            print(block.timestamp)
        deltas = [next.timestamp - current.timestamp for current, next in zip(blocks_to_send, blocks_to_send[1:])]
        return sum(deltas) / len(deltas)


def provide_data_every(n_seconds, web3):
    last_block_number = 0
    while True:
        time.sleep(n_seconds)
        last_sent_block = web3.eth.getBlock(last_block_number) if last_block_number > 0 else None
        new_last_block_number, blocks_to_send = retrieve_new_blocks_since(last_block_number, web3)
        last_block_number = new_last_block_number
        node_data = gather_data(blocks_to_send, last_sent_block, web3)
        print(node_data)
        send_data(node_data)


def gather_data(blocks_to_send, last_sent_block, web3):
    avg_block_difficulty = calculate_avg_block_difficulty(blocks_to_send)
    avg_block_time = calculate_avg_block_time(blocks_to_send, last_sent_block)
    node_id = web3.admin.nodeInfo.id
    host_id = web3.admin.nodeInfo.id
    hash_rate = web3.eth.hashrate
    gas_price = web3.eth.gasPrice
    is_mining = 1 if web3.eth.mining else 0
    node_data = {'hostId': host_id, 'hashrate': hash_rate, 'gasPrice': gas_price,
                 'avgBlockDifficulty': avg_block_difficulty, "avgBlockTime": avg_block_time, "isMining": is_mining}
    return node_data


def send_data(node_data):
    try:
        ni.ifaddresses('eth0')
        ip = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
        split = ip.split('.')
        server_ip = split[0] + '.' + split[1] + '.' + split[2] + '.' + '1'
        SERVER_ADDRESS = 'http://' + server_ip + ':3030'
        response = requests.post(SERVER_ADDRESS, data=node_data)
        print("Request has been sent, response: " + response.text)
    except ConnectionError:
        print("Connection has not been established")


if __name__ == "__main__":
    SEND_PERIOD  = 10
    web3_connector = connect_to_blockchain()
    start_mining(web3_connector)
    provide_data_every(SEND_PERIOD, web3_connector)
