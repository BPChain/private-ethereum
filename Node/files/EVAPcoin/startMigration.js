const execa = require("execa")
module.exports = function () {
    const id = setInterval(function () {
    execa('truffle', ['migrate', '--network=dev']).then(function (result) {
        console.log(result)
        process.exit(0)
    })
}, 10000)
}





