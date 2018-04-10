const execa = require("execa")
module.exports = function (address, iterationTime) {

             execa('truffle', ['exec', 'generateCoins.js', address, '--network=dev']).then(function ()
            {
                require("./simulateTransactions")(address, iterationTime)
            })
}

