const ws = require('ws')
const WebSocketServer = ws.Server

const EVAPCoin = artifacts.require("../contracts/EVAPCoin.sol");

module.exports = function(deployer) {

    return deployer.deploy(EVAPCoin).then(function () {
        return EVAPCoin.deployed()
            .then(function (instance) {
                require("../scripts/master/generate")()
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

