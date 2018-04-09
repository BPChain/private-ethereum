const ws = require('ws')
var connections = []
const WebSocketServer = ws.Server
const wsServerFSOC = new WebSocketServer({port: 20000})
const wsServerDOCKER = new WebSocketServer({port: 20001})
                wsServerFSOC.on('connection', function incoming(connection) {
                    connection.on('message', function message(data) {
                        console.log("#########################################################")
                        console.log("Received message successfully")
                        console.log(data)
                        wsServerDOCKER.clients.forEach(function (connection) {
                            connection.send(data)
                        })
                 })
                wsServerDOCKER.on('connection', function incoming(connection) {

                    })
