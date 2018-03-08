var EVAPCoin = artifacts.require("./EVAPCoin.sol");
module.exports = async function (instance, receiver, value) {
        return await instance.transfer(receiver, value);
}
