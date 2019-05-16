// migrating the appropriate contracts
var AMKaasu = artifacts.require("./AMKaasu.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(AMKaasu);
  //deployer.deploy(SolnSquareVerifier);
};
