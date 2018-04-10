const execa = require("execa")
const WebSocket = require('ws')
module.exports = function (address, interval) {

    var ws
    var bytes_to_send = 0x0000000000000000000000000000000000000000000000000000000001020304
    ws = new WebSocket('ws://eth_contract_deployer:20001')
    var intervalID

    ws.on('message', function incoming(data) {
        console.info("############Changeinfo received##################")
        console.info(data)
        clearInterval(intervalID)
        var newInterval = JSON.parse(data).frequency
        console.info(newInterval)
        startInterval(newInterval)
    })

    function startInterval(_interval) {

      intervalID = setInterval(function() {
        try {
            console.info("&&&&&&&&&&&INTERVAL&&&&&&&&&&&&")
            console.info(_interval)
            return execa('truffle', ['exec', 'sendTransaction.js', address, '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', bytes_to_send ,'1', '--network=dev'])
                .then(function (result) {
                    console.log(result)
                })
        } catch(error){
            console.log(error)
        }
      }, _interval);
}
      startInterval(interval)


}
