const execa = require("execa")

const id = setInterval(function () {
execa('truffle', ['migrate', '--network=dev']).then(function (result) {
        console.log(result)
        process.exit(0)
    }).catch(function (error){
        console.log("Error while migrating")
        console.log(error)
    })

}, 10000)

