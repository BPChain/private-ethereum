const ws = require('ws')
const WebSocketServer = ws.Server
const wsServer = new WebSocketServer({port: 20000})
                wsServer.on('message', function incoming(data) {
                    console.log("#########################################################")
                    console.log("Received message successfully")
                    console.log(data)
                 })