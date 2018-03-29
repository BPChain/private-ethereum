const execa = require("execa")
module.exports = function (address, iterationTime) {
    var interval = setInterval(function() {
        try {
            return execa('truffle', ['exec', 'becomeStudent.js', address, '--network=dev']).then(function (result) {
                console.log(result)
                return result
            }).then(function () {
                clearInterval(interval)
                require("./simulateTransactions")(address, iterationTime)
            }).then(function () {

            })
        } catch (error) {
            console.log("Become Student failed")
        }
    }, 30000)
}

