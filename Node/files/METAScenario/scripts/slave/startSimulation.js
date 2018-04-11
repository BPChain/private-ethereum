const WebSocket = require('ws');
const iterationTime = process.argv[2]
const execa = require("execa")

function start(error_flag) {
  var ws
    ws = new WebSocket('ws://eth_contract_deployer:40000')
     ws.on('message', function incoming(address) {
          console.log("-------------------------Address-------------")
          console.log(address)
         if(error_flag === 0) {
             generateCoins()
         }
          require("./simulateContract")(address, iterationTime).catch(function (error) {
              setTimeout(function () {
          console.log("Starting simulation failed");
          console.log(error)
          start(1)
        }, 10000)
         })
     })
  ws.onerror=function(event) {
          console.log("Contract address WebSocket not reachable");
          ws.close()
  }

  ws.onclose=function(event){
      setTimeout(function () {
          start(0)
        }, 10000)
  }

}

function generateCoins() {
        try {
            return execa('truffle', ['exec', 'generateCoins.js', address, '--network=dev']).then(function () {
            })
        } catch(error)
        {
            setTimeout(function () {
                generateCoin()
            }, 10000)
        }
}
start(0)

