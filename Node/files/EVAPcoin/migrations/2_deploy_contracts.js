const ws = require('ws')
const WebSocketServer = ws.Server
const execa = require("execa")

const EVAPCoin = artifacts.require("../contracts/EVAPCoin.sol");

module.exports = function(deployer) {

    return deployer.deploy(EVAPCoin).then(function () {
        return EVAPCoin.deployed()
            .then(function (instance) {
                execa('truffle', ['exec', '../scripts/master/generate.js','--network=dev'])
                return instance.address
            })
            .then(function (address) {
                const wsServer = new WebSocketServer({port: 40000})
                wsServer.on('connection', function (connection) {
                    connection.send(address)
                })
            })
    })
}

