var EVAPCoin = require("./attachToContract")(process.argv[2])
console.log(process.argv[2])
module.exports = function (callback) {
    console.log(EVAPCoin.myBalance());
}
