const execa = require("execa")
module.exports = function (address, iterationTime) {
    setInterval(function(){
        return execa('truffle', ['exec', 'sendTransaction.js', address, '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', '1', '--network=dev'])
    .then(function (result) {
        console.log("Transaktion beendet")
        console.log(result)
    })
    }, 20000)
}