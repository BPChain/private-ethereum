const execa = require("execa")
const WebSocket = require('ws')
const randomBytes = require('random-bytes')
module.exports = function (address, interval) {

    var ws
    var bytes_to_send = randomBytes.sync(1)
    ws = new WebSocket('ws://eth_contract_deployer:20001')
    var intervalID

    ws.on('message', function incoming(data) {
        clearInterval(intervalID)
        var newInterval = JSON.parse(data).frequency
        var newPayloadSize = JSON.parse(data).payloadSize
        bytes_to_send = randomBytes.sync(newPayloadSize)
        startInterval(newInterval, bytes_to_send)
    })

    function startInterval(_interval, _bytes_to_send) {

      intervalID = setInterval(function() {
        try {
            console.log("Sending:")
            console.log(_bytes_to_send)
            return execa('truffle', ['exec', 'sendTransaction.js', address, '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', '1', _bytes_to_send, '--network=dev'])
                .then(function (result) {
                    console.log(result)
                })
        } catch(error){
            console.log(error)
        }
      }, _interval);
}
      startInterval(interval, bytes_to_send)


}
