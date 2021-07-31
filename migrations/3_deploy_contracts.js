var Market = artifacts.require("./Tokenmarket.sol");

module.exports = function(deployer) {
  deployer.deploy(Market,"0x123296C7F0fa344A9205934a47D397bF509340A4");
};