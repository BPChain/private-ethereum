var EVAPCoin = artifacts.require("../contracts/EVAPCoin.sol");

module.exports = function(deployer) {
  var evap;
  deployer.deploy(EVAPCoin);
  EVAPCoin.deployed().then(function (instance) {
    evap = instance;
    return evap.address;
    }).then(function (result) {
      console.log(result);
    });

};
