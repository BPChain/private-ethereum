const ws = require('ws')
const WebSocketServer = ws.Server
const execa = require("execa")

const EVAPCoin = artifacts.require("../contracts/EVAPCoin.sol");

module.exports = function(deployer) {
    var address
    return deployer.deploy(EVAPCoin).then(function () {
        return EVAPCoin.deployed()
            .then(function (instance) {
                address = instance.address
                return address
            }).then(function () {
                execa('truffle', ['exec', '../EVAPcoin/scripts/master/generate.js','--network=dev'])
                return address
            }).then(function () {
                const wsServer = new WebSocketServer({port: 40000})
                wsServer.on('connection', function (connection) {
                    connection.send(address)
                })
            })
    })
}

