const ws = require('ws')
var connections = []
const WebSocketServer = ws.Server
const wsServerFSOC = new WebSocketServer({port: 20000})
const wsServerDOCKER = new WebSocketServer({port: 20001})
var number_of_connections = 0
var cached_data = JSON.stringify({"payloadSize": 10, "period": 20})
    setInterval(function () {
        if (number_of_connections < wsServerDOCKER.clients.size) {
            number_of_connections = wsServerDOCKER.clients.size
            wsServerDOCKER.clients.forEach(function (connection) {
                                connection.send(cached_data)
                            })
        }
        if(wsServerDOCKER.clients.size < number_of_connections) {
            number_of_connections = wsServerDOCKER.clients.size
        }
    }, 5000)
    wsServerFSOC.on('connection', function incoming(connection) {
        connection.on('message', function message(data) {
            console.log("#########################################################")
            console.log("Received message successfully")
            console.log(data)
            cached_data = data
            number_of_connections = wsServerDOCKER.clients.size
            wsServerDOCKER.clients.forEach(function (connection) {
                connection.send(data)
            })
        })
        connection.onclose=function (event) {
            number_of_connections = wsServerDOCKER.clients.size
        }
    })
    wsServerDOCKER.on('connection', function incoming(connection) {

        })
