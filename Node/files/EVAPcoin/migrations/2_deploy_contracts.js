var User = artifacts.require("../contracts/EVAPCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(User);
};
