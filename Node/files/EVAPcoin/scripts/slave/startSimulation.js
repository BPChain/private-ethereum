const WebSocket = require('ws');
const iterationTime = process.argv[2]

function start() {
  var ws
    ws = new WebSocket('ws://eth_contract_deployer:40000')
     ws.on('message', function incoming(address) {
          console.log("-------------------------Addresse-------------")
          console.log(address)
          require("./simulateContract")(address, iterationTime).then(function () {
         })
     })
  ws.onerror=function(event) {

      setTimeout(function () {
          console.log("Contract address WebSocket not reachable");
          start()
        }, 10000)
  }

}
start()

