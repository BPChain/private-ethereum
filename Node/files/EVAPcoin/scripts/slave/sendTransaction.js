var EVAPCoin = require("./attachToContract")(process.argv[4], web3)
var receiver = process.argv[5];
var value = process.argv[6];
module.exports = function (address) {
    var result = EVAPCoin.transfer(receiver, value);
    console.log(result)
}
