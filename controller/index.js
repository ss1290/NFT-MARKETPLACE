const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')

const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

var networkId;
const init = async()=>{
    const id = await web3.eth.net.getId();
    networkId = id;
}
init();
console.log(networkId)
// const deployedNetwork = myContract.networks[networkId];
// const contract = new web3.eth.Contract(myContract.abi,deployedNetwork.address);
// console.log(contract);

app.get('/web3Exists',async(req,res)=>{
    if(web3){
        console.log(web3)
        res.send('ethereum api fetched!');
    }
})

app.get('/contract',async(req,res)=>{
    if(contract) {
        res.send('contract fetched!');
        console.log(contract);
    }
})
app.get('/mint',async(req,res)=>{
    await contract.methods.mint().send()
    console.log(contract.methods.current())
    res.send('token minted');
})
app.listen('3000',()=>{
    console.log('server started on port 3000');
})