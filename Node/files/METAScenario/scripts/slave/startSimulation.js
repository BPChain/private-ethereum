const WebSocket = require('ws');
const iterationTime = process.argv[2]

function start() {
  var ws
    ws = new WebSocket('ws://eth_contract_deployer:40000')
     ws.on('message', function incoming(address) {
          console.log("-------------------------Address-------------")
          console.log(address)
          require("./simulateContract")(address, iterationTime).catch(function (error) {
              setTimeout(function () {
          console.log("Starting simulation failed");
          console.log(error)
          start()
        }, 10000)
         })
     })
  ws.onerror=function(event) {
          console.log("Contract address WebSocket not reachable");
          ws.close()
  }

  ws.onclose=function(event){
      setTimeout(function () {
          start()
        }, 10000)
  }

}
start()

