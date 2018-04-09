const execa = require("execa")
const WebSocket = require('ws')
module.exports = function (address, iterationTime) {
    var ws
    ws = new WebSocket('ws://eth_contract_deployer:20001')

        setInterval(function() {
        try {
             ws.on('message', function incoming(data) {
                 console.info("############Changeinfo received##################")
                 console.info(data)
             })
            return execa('truffle', ['exec', 'sendTransaction.js', address, '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', '1', '--network=dev'])
                .then(function (result) {
                    console.log(result)
                })
        } catch(error){
            console.log(error)
        }
}, iterationTime)
}
