const BlindAuction = artifacts.require("BlindAuction");

module.exports = function (deployer) {
  const biddingTime = 3600; // Duration of the bidding phase in seconds
  const revealTime = 1800; // Duration of the reveal phase in seconds
  const beneficiaryAddress = "0xD9c8F300F62474Ff78540A800d13A1923f028C91"; // Replace with the beneficiary's address

  deployer.deploy(BlindAuction, biddingTime, revealTime, beneficiaryAddress);
};