const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')
const mysql = require('mysql');
const tokenList = require('../fetchedData/mint.json');

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


app.get('/transfer/:id',async(req,res)=>{
    const addresses = await web3.eth.getAccounts();
//     let token = tokenList
    
//     token.previousOwner = '0x4BF56b7549e1D369b6B0AeC2de51bb67D31eBA5d'
//     token.currentOwner = "0x6100Ef9a6B7bD8b791cAf8be033EC2ee1544d8b5"
// console.log(JSON.stringify(token))
// const filePath = path.join(__dirname, "../fetchedData/mint.json");
//       fs.writeFileSync(filePath,JSON.stringify(token));  
})

app.listen('3000',()=>{
    console.log('server started on port 3000');
})