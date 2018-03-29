const execa = require("execa")
module.exports = function (address, iterationTime) {
    try{
            return execa('truffle', ['exec', 'becomeStudent.js', address, '--network=dev']).then(function (result) {
                console.log(result)
                return result
            }).then(function () {
                require("./simulateTransactions")(address, iterationTime)
            }).then(function () {

            })
        } catch (error) {
            console.log("Become Student failed")
        }
}

