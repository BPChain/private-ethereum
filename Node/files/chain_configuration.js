const ws = require('ws')
const WebSocketServer = ws.Server
const wsServer = new WebSocketServer({port: 20000})
                wsServer.on('message', function incoming(iterationTime, payload_size) {
                    console.log("#########################################################")
                    console.log("Received message successfully")
                    console.log(iterationTime)
                    consol.log(payload_size)
                 })