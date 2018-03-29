const execa = require("execa")
module.exports = function (address, iterationTime) {
        setInterval(function() {
        try {
            return execa('truffle', ['exec', 'sendTransaction.js', address, '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f', '1', '--network=dev'])
                .then(function (result) {
                    console.log(result)
                })
        } catch(error){
            console.log(error)
        }
}, iterationTime)
}
