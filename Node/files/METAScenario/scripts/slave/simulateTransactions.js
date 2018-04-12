const execa = require("execa")
const WebSocket = require('ws')
const randomBytes = require('random-bytes')
module.exports = function (address, interval) {
    var bytes_to_send = randomBytes.sync(1)
    var intervalID

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

    function startws(){
        var ws
        ws = new WebSocket('ws://eth_contract_deployer:20001')
            ws.on('message', function incoming(data) {
                clearInterval(intervalID)
                var newInterval = JSON.parse(data).period * 1000
                var newPayloadSize = JSON.parse(data).payloadSize
                bytes_to_send = randomBytes.sync(newPayloadSize)
                startInterval(newInterval, bytes_to_send)
            })
        ws.onerror=function(error) {
                            setTimeout(function () {
                                ws.close()
                startws()
            }, 10000)
        }
    }

    startws()
    startInterval(interval, bytes_to_send)
}
