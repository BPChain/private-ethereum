const execa = require("execa")

function start() {
execa('truffle', ['migrate', '--network=dev']).then(function (result) {
        console.log(result)
        process.exit(0)
    }).catch(function (error){
        console.log("Error while migrating")
        console.log(error)
        start()
    })

}

start()

