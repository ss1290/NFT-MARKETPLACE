const {assert} = require('chai')


const OpenMarket = artifacts.require('./OpenMarket');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('OpenMarket', (accounts) => {
    let contract
    // before tells our tests to run this first before anything else 
    beforeEach( async () => {
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
            assert.equal(name, 'Krypto Cat')
        })
        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'KC')
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
    
    describe("Minting token & tokenURI Minting tokens in batch",async()=>{
        it("token should be minted",async()=>{
           const result = await contract.mint({from:accounts[0]})
            let balance = await contract.balanceOf(accounts[0]);
            assert.equal(balance,1)
            const event = result.logs[0].args
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from the contract')
            assert.equal(event.to, accounts[0], 'to is msg.sender')
        })
        it("check for valid tokenURI",async() => {
            const tokenURI = await contract.tokenURI(1);
            assert.equal(tokenURI, "testURI1.json" )
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
            let tokenSaleStatus = await contract.isTokenForSale(1)
            assert.equal(tokenSaleStatus,false)
        })
        it("Should set a token to sale",async()=>{
            await contract.setTokenForSale(1,1212)
            let tokenSaleStatus = await contract.isTokenForSale(1)
            assert.equal(tokenSaleStatus,true)
        })
        it("Token should have a price if on sale",async()=>{
            let tokenPrice = await contract.getTokenPrice(1)
            assert.equal(tokenPrice,1212)
        })
        it("Token price should changed according to user choice",async()=>{
            await contract.changeTokenPrice(1,3000)
            let tokenPrice = await contract.getTokenPrice(1)
            assert.equal(tokenPrice,3000)

        })
        it("Should remove token from sale",async()=>{
            await contract.removeTokenFromSale(1)
            let tokenSaleStatus = await contract.isTokenForSale(1)
            assert.equal(tokenSaleStatus,false)
        })
    })

    describe("BUYNFT", async()=>{
        it("Should be able to buy token",async()=>{
            await contract.mint()
            await contract.setTokenForSale(1,1212)
            await contract.buyNFT(1,{from:accounts[1]})
            let newTokenOwner = await contract.ownerOf(1)
            assert.equal(newTokenOwner, accounts[1]);
        })
        it("Buyer should get the token",async()=>{
            let currentTokenOwner = await contract.ownerOf(1)
            assert.equal(currentTokenOwner,accounts[1])
        })
        it("Token should be removed from sale",async()=>{
            let isTokenForSale = await contract.isTokenForSale(1)
            assert.equal(isTokenForSale,false)
        })
    })
})