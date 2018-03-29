const WebSocket = require('ws');
const sleepSecs = require('@simsieg/sleepjs').sleepSeconds
const iterationTime = process.argv[2]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
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
    sleepSecs(10).then(function () {
      console.log("Error");
      start()
    })
  }
}



start()