"""Collect Data from the ethereum blockchain and send it to the server"""

import sys
from time import sleep

import yaml
from statistics_reader.sender import Sender

from .ethereum_adapter import EthereumAdapter


def main():
    is_miner = sys.argv[1] if len(sys.argv) > 1 else '1'
    uri = yaml.safe_load(open("/root/files/config.yml"))
    server_address = uri['serverAddress']
    Sender(server_address, 'geth', 'ethereum', EthereumAdapter(is_miner))


if __name__ == '__main__':
    sleep(20)
    main()
