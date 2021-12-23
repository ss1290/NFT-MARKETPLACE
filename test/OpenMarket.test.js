const {assert} = require('chai')


const OpenMarket = artifacts.require('./OpenMarket');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('OpenMarket', (accounts) => {
    let contract
    // before tells our tests to run this first before anything else 
    before( async () => {
    contract = await OpenMarket.deployed() 
    })

    // testing container - describe 

    describe('deployment', async() => {
        // test samples with writing it 
        it('deploys successfuly', async() => {
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'NFT TOKEN')
        })
        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'TFN')
        })
        it('supports IERC721interface', async() => {
            const check = await contract.supportsInterface('0x80ac58cd')
            assert.equal(check,true)
        })
        it('supports IERC721Metadatainterface', async() => {
            const check = await contract.supportsInterface('0x5b5e139f')
            assert.equal(check,true)
        })  
    })

    describe('minting', async ()=> {
        it('creates a new token', async () => {
            const result = await contract.mint()
          
            //Success
           
            const event = result.logs[0].args
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from the contract')
            assert.equal(event._to, accounts[0], 'to is msg.sender')

            //Failure
            await contract.mint().should.be.rejected;
            
        })
    })
    describe("Minting tokens and Minting tokens in batch",async()=>{
        it("token should be minted",async()=>{
            await contract.mint({from:accounts[0]})
            let balance = await contract.balanceOf(accounts[0]);
            assert.equal(balance,1)
        })
        it("token should be minted in batch",async()=>{
            await contract.mintInBatch(10,{from:accounts[0]})
            let balance = await contract.balanceOf(accounts[0]);
            assert.equal(balance,11)
        })
    })
    describe("Set token for sale & remove token from sale",async()=>{
        it("Token by default should not be on sale",async()=>{
            await contract.mint()
            let tokenSaleStatus = await contract.isTokenForSale(0)
            assert.equal(tokenSaleStatus,false)
        })
        it("Should set a token to sale",async()=>{
            await contract.setTokenForSale(0,1212)
            let tokenSaleStatus = await contract.isTokenForSale(0)
            assert.equal(tokenSaleStatus,true)
        })
        it("Token should have a price if on sale",async()=>{
            let tokenPrice = await contract.getTokenPrice(0)
            assert.equal(tokenPrice,1212)
        })
        it("Token price should changed according to user choice",async()=>{
            await contract.changeTokenPrice(0,3000)
            let tokenPrice = await contract.getTokenPrice(0)
            assert.equal(tokenPrice,3000)

        })
        it("Should remove token from sale",async()=>{
            await contract.removeTokenFromSale(0)
            let tokenSaleStatus = await contract.isTokenForSale(0)
            assert.equal(tokenSaleStatus,false)
        })
    })

    describe("BUYNFT", async()=>{
        it("Should be able to buy token",async()=>{
            await contract.mint()
            await contract.setTokenForSale(0,1212)
            await contract.buyNFT(0,{from:accounts[1]})
            let newTokenOwner = await contract.ownerOf(0)
            assert.equal(newTokenOwner, accounts[1]);
        })
        it("Buyer should get the token",async()=>{
            let currentTokenOwner = await contract.ownerOf(0)
            assert.equal(currentTokenOwner,accounts[1])
        })
        it("Token should be removed from sale",async()=>{
            let isTokenForSale = await contract.isTokenForSale(0)
            assert.equal(isTokenForSale,false)
        })
    })

    describe('transferFrom and approve', async() => {
        // it('transferFrom ', async() => {
        //        await contract.mint();
        //        await contract.TransferFrom(accounts[2],0) 
        //        const balance = await contract.balanceOf(accounts[2])
        //        assert.equal(balance, 1)
        //     })
        it('approve', async() => {
                await contract.mint({from:accounts[0]});
                const rec = await contract.approve(accounts[1],1)
                const check1 = await contract.checkApproval(accounts[0],1);
                const check2 = await contract.checkApproval(accounts[1],1);
                assert.equal(check1,true)
                assert.equal(check2,true)
             })
        })

      

})