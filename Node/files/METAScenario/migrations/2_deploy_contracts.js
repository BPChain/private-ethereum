const ws = require('ws')
const WebSocketServer = ws.Server
const execa = require("execa")

const METAScenario = artifacts.require("../contracts/METAScenario.sol");

module.exports = function(deployer) {
    var address
    return deployer.deploy(METAScenario).then(function () {
        return METAScenario.deployed()
            .then(function (instance) {
                address = instance.address
                return address
            }).then(function () {
                const wsServer = new WebSocketServer({port: 40000})
                wsServer.on('connection', function (connection) {
                    connection.send(address)
                })
            })
    })
}

