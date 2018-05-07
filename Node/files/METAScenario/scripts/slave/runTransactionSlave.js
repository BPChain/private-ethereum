const WebSocket = require('ws')
const WebSocketServer = ws.Server
const Web3 = require('web3')
const http = require('http')
const ip = require('ip')

module.exports = function (address) {
    var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"students","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myBalance","outputs":[{"name":"myBalance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"generate","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"printAddress","outputs":[{"name":"self","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]')

    function initialize() {
        try {
            let provider = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8547"));
            let METAScenario = provider.eth.contract(abi).at(address);
            provider.eth.defaultAccount = provider.eth.accounts[0];
            let ip_address = ip.address()
            let options = {
                host: 'eth_contract_deployer',
                path: '/',
                port: '60000',
                method: 'POST'
            }
            let request = http.request(options, response => {
                console.log('delivered inf startin ws')
                console.log(response)
                startws(METAScenario)
            })
            request.write(ip_address.toString())
            request.end()

        }
        catch
            (error)
            {
                setTimeout(function () {
                    console.log("Default account could not be set. Retrying")
                    initialize()
                }, 20000)
            }
        }


        function startws(_METAScenario) {
            let ws = new WebSocketServer({port:20001})
            ws.on('message', function incoming(data) {
                let output = _METAScenario.transfer('0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', 1, data)
                console.log(output)
            })
            ws.onerror = function (error) {
                setTimeout(function () {
                    ws.close()
                    startws()
                }, 10000)
            }
        }

        initialize()
    }