const SimpleAuction = artifacts.require("SimpleAuction");

contract('SimpleAuction', (accounts) => {
    it('SimpleAuction', async () => {
        const auction = await SimpleAuction.deployed();
        await auction.bid({ from : accounts[1], value : web3.utils.toWei('1', 'ether')});
        await auction.bid({ from : accounts[2], value : web3.utils.toWei('2', 'ether')});
        await auction.bid({ from : accounts[3], value : web3.utils.toWei('5', 'ether')});
        const highestBidder = await auction.highestBidder();
        const highestBid = await auction.highestBid();
        console.log("highestBidder : " + highestBidder);
        console.log("highestBid : " + highestBid);
        assert.equal(highestBidder, accounts[3], "Highest bidder should be the sender");
        assert.equal(highestBid, web3.utils.toWei('5', 'ether'), "Highest bid should be the 50 Ether");
    });

    it('Withdraw', async () => {
        const auction = await SimpleAuction.deployed();
        const pending = await auction.withdraw({ from : accounts[2]});
        await auction.withdraw({ from : accounts[1]});
        console.log("Withdraw State : ", Boolean(pending));
        assert.equal(Boolean(pending), true, "Withdrawal should be successful");
    })

    // it('AuctionEnd', async () => {
    //     const auction = await SimpleAuction.deployed();
    //     await auction.auctionEnd({ from : accounts[3]}, web3.utils.toWei('5', 'ether'));
    // })
    // it('should end auction', async () => {
    //     await auction.bid({ from: accounts[1], value: 10 });
    //     await auction.auctionEnd({ from: accounts[0] });
    //     const ended = await auction.ended();
    //     const highestBidder = await auction.highestBidder();
    //     const highestBid = await auction.highestBid();
    //     assert.isTrue(ended, "Auction should be ended");
    //     assert.equal(highestBidder, accounts[1], "Highest bidder should be the sender");
    //     assert.equal(highestBid, 10, "Highest bid should be 10 Ether");
    //   });
})