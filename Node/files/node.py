import json
import web3
import time
from web3 import Web3, HTTPProvider, TestRPCProvider
import requests
connected = False
SERVER_ADRESS = 'http://localhost:3030'

while not connected:
    try:
        time.sleep(10)
        web3 = Web3(HTTPProvider('http://localhost:8545'))
    except Exception:
        pass
    connected = True
web3.miner.start(1)
while True:
    time.sleep(10)
    print(web3.eth.getBalance(web3.eth.accounts[0]))
    print(web3.eth.hashrate)

blockchain_data = {'hashrate' : web3.eth.hashrate}

requests.post(SERVER_ADRESS, data = blockchain_data)