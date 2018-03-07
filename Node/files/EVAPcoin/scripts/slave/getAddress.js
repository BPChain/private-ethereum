const WebSocket = require('ws');
const id = setTimeout(function () {
  var ws
  try {
    ws = new WebSocket('ws://eth_contract_deployer:40000')
     ws.on('message', function incoming(address) {
       console.log("-------------------------Addresse-------------")
       console.log(address)

       clearInterval(id)
     })
  }
  catch (Exception) {
    console.error(Exception)
  }
}, 1000)


