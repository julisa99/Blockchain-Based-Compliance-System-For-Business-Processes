const OnlineShopBusinessProcess = artifacts.require("OnlineShopBusinessProcess");

module.exports = function(deployer) {
  deployer.deploy(OnlineShopBusinessProcess);
};