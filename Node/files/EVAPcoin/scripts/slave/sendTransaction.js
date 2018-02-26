var EVAPCoin = require("./attachToContract")(process.argv[2])
var receiver = "0xca247d7425a29c6645fa991f9151f994a830882d"
var value = 1
module.exports = function (callback) {
    var result = EVAPCoin.transfer(receiver, value);
    console.log(result)
}
