const net = require("net")
const Web3 = require("web3")
// Create a socket (client) that connects to the server
console.info("Script runs good and great")
const socket = new net.Socket()
const web3 = new Web3("ws://localhost:8546")
console.info(web3)

socket.connect(2020, "localhost", function () {
  console.info("Client: Connected to server")
  socket.write(JSON.stringify({ response: "Hey there server!" }))
  socket.end()
  //hallo
})

