const {assert} = require('chai')


const OpenMarket = artifacts.require('./OpenMarket');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (accounts) => {
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
        it('supports interface', async() => {
            const check = await contract.supportsInterface('0x80ac58cd') || contract.supportsInterface('0x5b5e139f')
            assert.equal(check,true)
        })
    })

    
    describe('minting', async ()=> {
        it('creates a new token', async () => {
            const result = await contract.mint('https...1')
          
            //Success
           
            const event = result.logs[0].args
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from the contract')
            assert.equal(event._to, accounts[0], 'to is msg.sender')
            assert.equal()

            //Failure
            await contract.mint('https...1').should.be.rejected;
        })
    })

})