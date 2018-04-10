const execa = require("execa")
module.exports = function (address, iterationTime) {

            return execa('truffle', ['exec', 'generateCoins.js', address, '--network=dev']).then(function (result) {
                console.log(result)
                return result
            }).then(function () {
                require("./simulateTransactions")(address, iterationTime)
            })
}

