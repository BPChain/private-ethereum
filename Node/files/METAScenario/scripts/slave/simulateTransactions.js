const execa = require("execa")
const WebSocket = require('ws')
const randomBytes = require('random-bytes')
const contract = require('truffle-contract')
const Web3 = require('web3')

module.exports = function (address, interval) {
    var bytes_to_send = randomBytes.sync(1)
    var intervalID
    var abi = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"students","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myBalance","outputs":[{"name":"myBalance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"generate","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"printAddress","outputs":[{"name":"self","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]'

    function initialize() {
        var provider = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8547"));
        METAScenario = provider.eth.contract(abi).at(address);
        provider.eth.defaultAccount = provider.eth.accounts[0];
        var bla = randomBytes.sync(1)
        var result = METAScenario.transfer('0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', 1, bla)
        console.log(result)
        startws()
        startInterval(interval, bytes_to_send)

    }

    function startInterval(_interval, _bytes_to_send) {
      intervalID = setInterval(function() {
        try {
            console.log("Sending:")
            console.log(_bytes_to_send)
            return execa('truffle', ['exec', 'sendTransaction.js', address, '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', '1', _bytes_to_send, '--network=dev'])
                .then(function (result) {
                    console.log(result)
                })
        } catch(error){
            console.log(error)
        }
      }, _interval);
    }

    function startws(){
        var ws
        ws = new WebSocket('ws://eth_contract_deployer:20001')
            ws.on('message', function incoming(data) {
                clearInterval(intervalID)
                var newInterval = JSON.parse(data).period * 1000
                var newPayloadSize = JSON.parse(data).payloadSize
                bytes_to_send = randomBytes.sync(newPayloadSize)
                startInterval(newInterval, bytes_to_send)
            })
        ws.onerror=function(error) {
                            setTimeout(function () {
                                ws.close()
                startws()
            }, 10000)
        }
    }

    initialize()
}
