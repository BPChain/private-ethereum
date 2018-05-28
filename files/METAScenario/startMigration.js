const abi = require('./contractAbi.json')
const Web3 = require('web3')
const ws = require('ws')
const WebSocketServer = ws.Server
const requiredBalance = 9999999999
const sleepSeconds = require('sleepjs').sleepSeconds
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8547"))
const data = require('fs')
  .readFileSync('deployData.txt')

function deployContract () {
  try {
    const account = web3.eth.accounts[0]
    if (web3.eth.getBalance(account)
        .toString(10) > requiredBalance) {
      console.log('Starting deploying')
      web3.eth.defaultAccount = account
      web3.personal.unlockAccount(account, '123')
      const metascenarioContract = web3.eth.contract(abi)
      metascenarioContract.new({
        from: account,
        data,
        gas: '4700000',
      }, (error, contract) => {
      if (error) {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&InContractError&&&&&&&&&&&&&&&&&&&&')
        console.log(error)
        sleepSeconds(5)
          .then(deployContract)
      }
      else if (!contract.address) {
        console.log('no address yet')
      }
      else {
        startWebSocket(contract.address)
      }
    })
    }
    else {
      sleepSeconds(10)
        .then(deployContract)
    }
  }
  catch (error) {
    console.log(error)
    sleepSeconds(10)
      .then(deployContract)
  }
}

function startWebSocket (contractAddress) {
  try {
    const wsServer = new WebSocketServer({port: 40000})
    wsServer.on('connection', (connection) => {
      connection.send(contractAddress)
  })
    ws.onerror = function (error) {
      console.log('Contract address WebSocket not reachable', error)
      ws.close()
    }
    ws.onclose = function () {
      sleepSeconds(10)
        .then(() => startWebSocket(contractAddress))
    }
  }
  catch (error) {
    sleepSeconds(10)
      .then(() => startWebSocket(contractAddress))
  }
}

deployContract()

