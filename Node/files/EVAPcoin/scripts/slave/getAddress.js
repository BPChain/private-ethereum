const WebSocket = require('ws');
const id = setInterval(function () {
  var ws
    ws = new WebSocket('ws://eth_contract_deployer:40000')
     ws.on('message', function incoming(address) {
          console.log("-------------------------Addresse-------------")
          console.log(address)
          clearInterval(id)
          require("./simulateContract")(address).then(function () {
          process.exit(0)
         })
     })
  ws.onerror=function(event){
    console.log("Error");
  }
}, 1000)
