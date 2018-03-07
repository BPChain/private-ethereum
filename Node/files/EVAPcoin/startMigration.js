const execa = require("execa")

const id = setInterval(function () {
execa('truffle', ['migrate', '--network=dev']).then(function (result) {
        console.log(result)
        process.exit(0)
    }).catch(function (){

    })

}, 10000)

