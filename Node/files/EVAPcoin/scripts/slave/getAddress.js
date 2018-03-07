const WebSocket = require('ws');

const ws = new WebSocket('ws://eth_contract_deployer:40000');


ws.on('message', function incoming(address) {
    console.log("-------------------------Addresse-------------")
  console.log(address);
});