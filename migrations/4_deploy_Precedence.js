const Precedence = artifacts.require("Precedence");

module.exports = function(deployer) {
  deployer.deploy(Precedence);
};