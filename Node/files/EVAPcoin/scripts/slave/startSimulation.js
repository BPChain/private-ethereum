const WebSocket = require('ws');
const iterationTime = process.argv[1]
const id = setInterval(function () {
  var ws
    ws = new WebSocket('ws://eth_contract_deployer:40000')
     ws.on('message', function incoming(address) {
          console.log("-------------------------Addresse-------------")
          console.log(address)
          clearInterval(id)
          require("./simulateContract")(address, iterationTime).then(function () {
         })
     })
  ws.onerror=function(event){
    console.log("Error");
  }
}, 1000)
