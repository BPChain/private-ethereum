const execa = require("execa")
module.exports = function (address, iterationTime) {
        require("./simulateTransactions")(address, iterationTime)
}

