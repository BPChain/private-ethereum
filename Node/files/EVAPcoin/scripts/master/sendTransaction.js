var EVAPCoin = artifacts.require("./EVAPCoin.sol");
var receiver = process.argv[4];
var value = process.argv[5];
module.exports = function (callback) {
    var evap;
    EVAPCoin.deployed().then(function (instance) {
        evap = instance;
        return evap.transfer(receiver, value);
        }).then(function (result) {
        console.log(result);
        });
}