var METAScenario = require("./attachToContract")(process.argv[4], web3)

module.exports = function (callback) {
    setInterval(function() {
        METAScenario.generate(999999999999);
    }, 100000)

}
