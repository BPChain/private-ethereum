var EVAPCoin = artifacts.require("./EVAPCoin.sol");
var receiver = "0xca247d7425a29c6645fa991f9151f994a830882d"
var value = 1
module.exports = function (callback) {
    var evap;
    EVAPCoin.deployed().then(function (instance) {
        evap = instance;
        return evap.transfer(receiver, value);
        }).then(function (result) {
        console.log(result);
        });
}
