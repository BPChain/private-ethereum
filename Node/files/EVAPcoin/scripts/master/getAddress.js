var EVAPCoin = artifacts.require("./EVAPCoin.sol");

module.exports = function (callback) {
    var evap;
    EVAPCoin.deployed().then(function (instance) {
        evap = instance;
        return evap.address;
        }).then(function (result) {
        console.log(result);
        });
}
