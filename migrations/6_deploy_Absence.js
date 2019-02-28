const Absence = artifacts.require("Absence");

module.exports = function(deployer) {
  deployer.deploy(Absence);
};