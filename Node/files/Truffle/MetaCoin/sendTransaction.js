var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function (callback) {
    var meta;
    MetaCoin.deployed().then(function (instance) {
        meta = instance;
        return meta.sendCoin("0x9fdee1f124896789d7872fd157769198a17faeaa", 20);
        }).then(function (result) {
        return meta.getBalance.call(web3.eth.accounts[0]);
        }).then(function (balance) {
        console.log(balance.toNumber());
});
}

