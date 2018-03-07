const execa = require("execa")
module.exports = function (address) {
    execa('truffle', ['exec', 'becomeStudent.js','--network=dev', address])

}