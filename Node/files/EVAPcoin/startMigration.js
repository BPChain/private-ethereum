const execa = require("execa")

const id = setInterval(function () {
execa('truffle', ['migrate', '--network=dev']).then(function (result) {
        console.log(result)
    }).catch(function (){
        console.log("Error while migrating")
    })

}, 10000)

