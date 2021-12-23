const OpenMarket = artifacts.require("OpenMarket");

module.exports = function (deployer) {
  deployer.deploy(OpenMarket,"testURI");
};