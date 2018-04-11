const execa = require("execa")
module.exports = function (address, iterationTime) {
            return execa('truffle', ['exec', 'generateCoins.js', address, '--network=dev']).then(function () {})
}

