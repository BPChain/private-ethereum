var EVAPCoin = artifacts.require("./EVAPCoin.sol");

module.exports = async function (callback) {

    const instance = await EVAPCoin.deployed()
    setInterval(function () {
        try {
            await
            instance.generate(999999999999)
            const students = await
            instance.getStudents().call()
            students.map(function (student) {
                require("./sendTransaction")(instance, student, 1000)
            })
        } catch (error)
        {

        }
    }, 10000)

}