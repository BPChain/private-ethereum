const ws = require('ws')
const WebSocketServer = ws.Server
const wsServer = new WebSocketServer({port: 20000})
                wsServer.on('connection', function incoming(connection) {
                    connection.on('message', function message(data) {
                        console.log("#########################################################")
                        console.log("Received message successfully")
                        console.log(data)
                    })
                 })