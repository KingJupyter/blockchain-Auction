const BlindAuction = artifacts.require("BlindAuction");

contract("BlindAuction", (accounts) => {
  let blindAuction;

  before(async () => {
    blindAuction = await BlindAuction.deployed();
  });

  it("should place a blinded bid", async () => {
    const blindedBid = web3.utils.keccak256("100"); // Replace with the blinded bid
    const deposit = web3.utils.toWei("1", "ether"); // Replace with the deposit amount in Ether

    await blindAuction.bid(blindedBid, { value: deposit, from: accounts[1] });
    const bids = await blindAuction.bids(accounts[1]);

    assert.equal(bids.length, 1);
    assert.equal(bids[0].blindedBid, blindedBid);
    assert.equal(bids[0].deposit.toString(), deposit);
  });

  it("should reveal the bids", async () => {
    const values = [100]; // Replace with the actual bid amounts
    const fakes = [false]; // Replace with the fake flags
    const secrets = [web3.utils.keccak256("secret")]; // Replace with the secrets

    await blindAuction.reveal(values, fakes, secrets, { from: accounts[1] });
    const bids = await blindAuction.bids(accounts[1]);

    assert.equal(bids.length, 1);
    assert.equal(bids[0].blindedBid, "0x0000000000000000000000000000000000000000000000000000000000000000"); // Blinded bid should be cleared
  });

  it("should withdraw a bid", async () => {
    const initialBalance = await web3.eth.getBalance(accounts[1]);

    await blindAuction.withdraw({ from: accounts[1] });

    const finalBalance = await web3.eth.getBalance(accounts[1]);
    const pendingReturns = await blindAuction.pendingReturns(accounts[1]);

    assert.equal(pendingReturns.toString(), "0");
    assert.isAbove(Number(finalBalance), Number(initialBalance)); // Balance should increase after withdrawal
  });

  it("should end the auction", async () => {
    await blindAuction.auctionEnd({ from: accounts[0] });

    const ended = await blindAuction.ended();
    assert.isTrue(ended);
  });
});