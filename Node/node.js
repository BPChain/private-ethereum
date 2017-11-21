const net = require("net")

// Create a socket (client) that connects to the server
console.info("Script runs good")
const socket = new net.Socket()
socket.connect(2020, "localhost", function () {
  console.info("Client: Connected to server")
  socket.write(JSON.stringify({ response: "Hey there server!" }))
  socket.end()
  //hallo
})

