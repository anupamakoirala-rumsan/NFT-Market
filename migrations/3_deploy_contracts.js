var Market = artifacts.require("./Tokenmarket.sol");

module.exports = function(deployer) {
  deployer.deploy(Market,"0x8d6C1e6B466c2319F928505e0F38Eb7aceDFa987");
};