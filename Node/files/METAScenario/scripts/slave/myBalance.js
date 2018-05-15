var METAScenario = require("./attachToContract")(process.argv[4], web3)

module.exports = function (callback) {
    console.log(METAScenario.myBalance());
}
