const SimpleAuction = artifacts.require("SimpleAuction");

module.exports = (deployer) => {
  deployer.deploy(SimpleAuction, 
      1000, "0x1bE8A35c57c893AfF94E38dC21867C103229b865"
    );
    // web3.utils.asciiToHex('Rose Marin')
    // web3.utils.hexToString("")
};