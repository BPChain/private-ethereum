var EVAPCoin = require("./attachToContract")(process.argv[4], web3)

module.exports = function (callback) {
    console.log(EVAPCoin.myBalance());
}
