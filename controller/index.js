const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')

const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const deployedNetwork = myContract.networks["5777"];
const contract = new web3.eth.Contract(myContract.abi,deployedNetwork.address);
console.log(contract);
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
app.get('/balanceOf',async(req,res)=>{
    const addresses = await web3.eth.getAccounts();
    const balance=await contract.methods.balanceOf("0x4BF56b7549e1D369b6B0AeC2de51bb67D31eBA5d").call();
    res.send(balance);
})
app.listen('3000',()=>{
    console.log('server started on port 3000');
})