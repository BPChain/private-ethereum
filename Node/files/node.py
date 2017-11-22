import json
import web3

from web3 import Web3, HTTPProvider, TestRPCProvider

web3 = Web3(HTTPProvider('http://localhost:8545'))
print web3.eth.accounts