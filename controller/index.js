const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')
const mysql = require('mysql');
const tokenList = require('../fetchedData/mint.json');
const fs = require('fs');
const path = require('path');
//Create connection
const db = mysql.createConnection({ 
    host     : 'localhost',
    user     : 'root',
    database: 'MYNFT'  
});
//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

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
app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE MYNFT'
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
})
app.get('/createtokenstable',(req,res)=>{
    let sql = 'CREATE TABLE Token(tokenId int AUTO_INCREMENT, tokenName VARCHAR(255), tokenURI VARCHAR(255),tokenCreator VARCHAR(255),currentOwner VARCHAR(255),previousOwner VARCHAR(255), PRIMARY KEY (tokenId))'; 
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Token table created');
    });
})
app.get('/addtoken',(req,res) =>{
    let token = tokenList[0];
    let sql = 'INSERT INTO Token SET ?';
    let query = db.query(sql, token,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('token minted');
    });
});

<<<<<<< HEAD
app.get('/addtokeninbatch',(req,res) =>{

})

app.get('/balanceOf',async(req,res)=>{
=======

// app.get('/balanceOf',async(req,res)=>{
//     const addresses = await web3.eth.getAccounts();
//     const balance=await contract.methods.balanceOf("0x4BF56b7549e1D369b6B0AeC2de51bb67D31eBA5d").call();
//     res.send(balance);
// })

app.get('/transfer/:id',async(req,res)=>{
>>>>>>> 8eaa31f9ef6eca036d2b74790807fad81402384d
    const addresses = await web3.eth.getAccounts();
    let token = tokenList[0]
    token.previousOwner = '0x4BF56b7549e1D369b6B0AeC2de51bb67D31eBA5d'
    token.currentOwner = "0x6100Ef9a6B7bD8b791cAf8be033EC2ee1544d8b5"
console.log(JSON.stringify(token))
const filePath = path.join(__dirname, "../fetchedData/mint.json");
      fs.writeFile(filePath,JSON.stringify(token));
     
    const balance=await contract.methods.transferFrom("0x4BF56b7549e1D369b6B0AeC2de51bb67D31eBA5d","0x6100Ef9a6B7bD8b791cAf8be033EC2ee1544d8b5",req.params.id).call();
        let updateOwnership= {currentOwner : "0x6100Ef9a6B7bD8b791cAf8be033EC2ee1544d8b5",
                                 previousOwner :"0x4BF56b7549e1D369b6B0AeC2de51bb67D31eBA5d"};
       
        let sql = `UPDATE Token SET currentOwner = '${updateOwnership.currentOwner}',previousOwner = '${updateOwnership.previousOwner}'  WHERE id =${req.params.id}`;
        let query = db.query(sql,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send('Token Updated');
        });

    });

   

    




app.listen('3000',()=>{
    console.log('server started on port 3000');
})