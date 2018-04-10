var METAScenario = require("./attachToContract")(process.argv[4], web3)

module.exports = function (callback) {
    console.log("in generation")
    METAScenario.generate(999999999999)
    setInterval(function() {
        METAScenario.generate(999999999999);
    }, 10000000)

}
