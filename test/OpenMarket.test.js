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
        it('supports IERC721interface', async() => {
            const check = await contract.supportsInterface('0x80ac58cd')
            assert.equal(check,true)
        })
        it('supports IERC721Metadatainterface', async() => {
            const check = await contract.supportsInterface('0x5b5e139f')
            assert.equal(check,true)
        })
    })
        describe('transferFrom and approve', async() => {

            it('transferFrom ', async() => {
               const rec = await contract._TransferFrom('0xaE54d5De8B53B0bc9Ce2a91D56Ee742064a9269D',0)
               assert.notEqual(rec, '')
               assert.notEqual(rec, null)
               assert.notEqual(rec, undefined)
               assert.notEqual(rec, 0x0)
               assert.notEqual(rec, '')
               assert.notEqual(rec, null)
               assert.notEqual(rec, undefined)
               
            })

            it('approve', async() => {
                const rec = await contract._Approve('0xaE54d5De8B53B0bc9Ce2a91D56Ee742064a9269D',0)
               assert.notEqual(rec, '')
               assert.notEqual(rec, null)
               assert.notEqual(rec, undefined)
               assert.notEqual(rec, 0x0)
               assert.notEqual(rec, '')
               assert.notEqual(rec, null)
               assert.notEqual(rec, undefined)
             })
        })

      

})