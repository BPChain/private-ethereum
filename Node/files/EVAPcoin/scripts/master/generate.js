var EVAPCoin = artifacts.require("./EVAPCoin.sol");

module.exports = function (callback) {
    setInterval(function gen(){
        return EVAPCoin.deployed().then(function (instance) {
            instance.generate(99999999)
            return instance
        }).then(function (instance) {
            const students = instance.getStudents().call()
            return [students, instance]
        }).then(function (values) {
            students = values[0]
            instance = values[1]
            students.map(function (students) {
                require("./sendTransaction")(instance, student, 1000)
            })
        }).then(function () {

        })
    }(), 20000)
}
