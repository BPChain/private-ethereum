const WebSocketServer = require('ws').Server
const Web3 = require('web3')
const request = require('request')
const ip = require('ip')
const fs = require('fs')
const abi = require('../contractAbi.json')
const sleepSeconds = require('sleepjs').sleepSeconds
const provider = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8547'))

module.exports = function (address) {
  function initialize () {
    try {
      const METAScenario = provider.eth.contract(abi)
        .at(address)
      provider.eth.defaultAccount = provider.eth.accounts[0]
      const ipAddress = {
        ipAddress: ip.address()
          .toString(),
      }
      request({
        url: 'http://eth_contract_deployer:60000',
        method: 'POST',
        json: true,
        body: ipAddress,
      }, (error) => {
        if (error) {
          console.log(error)
        }
        console.log('connected')
      })
      startws(METAScenario)
    }
    catch (error) {
      sleepSeconds(20)
        .then(() => {
          console.log('Default account could not be set. Retrying')
          initialize()
        })
    }
  }


  function startws (_METAScenario) {
    console.log('!!!!! Started Websocket')
    const wsServer = new WebSocketServer({port: 20001})
    wsServer.on('connection', (socket) => {
      socket.on('message', (data) => {
        try {
          console.log(data)
          console.log('!!!!!!!!!!!!!Doing transaction')
          const output = _METAScenario
            .transfer('0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', 1, data)
          console.log(output)
        }
        catch (error) {
          console.log('!!!!!!!!!!!!!!!!!Transaction failed!!!!!!!!!')
          console.log(error)
        }
      })
      socket.onerror = function (error) {
        console.error(error)
        sleepSeconds(20)
          .then(() => {
            socket.close()
            startws()
          })
      }
    })
  }

  initialize()


