import time
from web3 import Web3, HTTPProvider
import requests
from functools import reduce

SERVER_ADDRESS = 'http://localhost:3030'


def connect_to_blockchain():
    web3 = Web3(HTTPProvider('http://localhost:8545'))
    while not web3.isConnected():
        time.sleep(1)
    return web3


def start_mining(web3):
    web3.miner.start(1)


def retrieve_last_blocks(number_of_last_sent_block, web3):
    """Gets the last mined blocks since last send cycle"""
    last_blocks = []
    number_of_last_block = web3.eth.getBlock('latest').number
    if number_of_last_block > number_of_last_sent_block:
        number_of_blocks_to_send = number_of_last_block - number_of_last_sent_block
        for i in range(1, number_of_blocks_to_send + 1):
            last_blocks.append(web3.eth.getBlock(number_of_last_sent_block + i))
        return number_of_last_block, last_blocks
    else:
        return number_of_last_sent_block, last_blocks


def calculate_avg_block_difficulty(blocks_to_send):
    if not blocks_to_send:  # checks if list is empty
        return None
    else:
        for block in blocks_to_send:
            print(block)
        print(blocks_to_send)
        print(blocks_to_send[0].timestamp)
        return reduce((lambda accum, block: accum + block.timestamp), blocks_to_send, 0) / len(blocks_to_send)


def calculate_avg_block_time(blocks_to_send, last_sent_block):
    blocks_to_send = [last_sent_block] + blocks_to_send
    if len(blocks_to_send) == 1:
        return None
    else:
        if blocks_to_send[0] is None:
            blocks_to_send.remove(None)
        if len(blocks_to_send) == 1:
            return None
        for block in blocks_to_send:
            print(block.timestamp)
        deltas = [next.timestamp - current.timestamp for current, next in zip(blocks_to_send, blocks_to_send[1:])]
        return sum(deltas) / len(deltas)


def provide_data_every(n_seconds, web3):
    """Loop, which runs on the nodes to get and send the data"""
    number_of_last_sent_block = 0
    while True:
        time.sleep(n_seconds)
        last_sent_block = web3.eth.getBlock(number_of_last_sent_block) if number_of_last_sent_block > 0 else None
        number_of_last_sent_block, blocks_to_send = retrieve_last_blocks(number_of_last_sent_block, web3)
        node_data = gather_data(blocks_to_send, last_sent_block, web3)
        print(node_data)
        send_data(node_data)


def gather_data(blocks_to_send, last_sent_block, web3):
    avg_block_difficulty = calculate_avg_block_difficulty(blocks_to_send)
    avg_block_time = calculate_avg_block_time(blocks_to_send, last_sent_block)
    node_id = web3.admin.nodeInfo.id
    hash_rate = web3.eth.hashrate
    gas_price = web3.eth.gasPrice
    node_data = {'node_id': node_id, 'hashrate': hash_rate, 'gas_price': gas_price,
                 'avg_block_difficulty': avg_block_difficulty, "avg_block_time": avg_block_time}
    return node_data


def send_data(node_data):  # send the data to the server
    try:
        requests.post(SERVER_ADDRESS, data=node_data)
        print("Request has been sent")
    except Exception:
        print("Connection has not been established")
        pass


if __name__ == "__main__":
    SEND_PERIOD  = 10
    web3_connector = connect_to_blockchain()
    start_mining(web3_connector)
    provide_data_every(SEND_PERIOD, web3_connector)
