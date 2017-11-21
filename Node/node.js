const net = require("net");

// Create a socket (client) that connects to the server
console.log("Script runs");
var socket = new net.Socket();
socket.connect(2020, "localhost", function () {
  console.log("Client: Connected to server");
  socket.write(JSON.stringify({ response: "Hey there server!" }));
// Close the connection
  socket.end();
});

