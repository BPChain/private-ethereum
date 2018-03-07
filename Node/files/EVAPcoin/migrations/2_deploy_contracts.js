const ws = require('ws')
const WebSocketServer = ws.Server

const EVAPCoin = artifacts.require("../contracts/EVAPCoin.sol");

module.exports = function(deployer) {

    deployer.deploy(EVAPCoin).then(function () {
        EVAPCoin.deployed()
            .then(function (instance) {
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

