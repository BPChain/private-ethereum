const execa = require("execa")
module.exports = function (address) {
    execa('truffle', ['exec', 'becomeStudent.js', address, '--network=dev']).then(function (result) {
        console.log(result)
    })

}