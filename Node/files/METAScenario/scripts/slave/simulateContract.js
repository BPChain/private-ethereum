const execa = require("execa")
module.exports = function (address, iterationTime) {
        require("./simulateTransactions")(address, iterationTime)
            return execa('truffle', ['exec', 'generateCoins.js', address, '--network=dev']).then(function () {})
}

