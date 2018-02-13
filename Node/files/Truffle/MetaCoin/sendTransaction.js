var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function (callback) {
    var meta;
    MetaCoin.deployed().then(function (instance) {
        meta = instance;
        console.log(meta.getBalance.call(web3.eth.accounts[0]));
        return meta.sendCoin("", 20);
    });
}