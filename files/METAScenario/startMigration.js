const execa = require("execa")

function start() {
    console.log(":::::::::Start Migration")
    execa('truffle', ['migrate', '--network=dev']).then(function (result) {
        console.log(result)
        process.exit(0)
    }).catch(function (error) {
        setTimeout(function () {
            console.log("Error while migrating")
            console.log(error)
            start()
        }, 15000)

    })
}

start()

