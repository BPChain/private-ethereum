var METAScenario = require("./attachToContract")(process.argv[4], web3)
var receiver = process.argv[5]
var value = process.argv[6]
var data = process.argv[7]
module.exports = function (address) {
    var result = METAScenario.transfer(receiver, value, data)
    console.log(result)
}
