const Existence = artifacts.require("Existence");

module.exports = function(deployer) {
  deployer.deploy(Existence);
};