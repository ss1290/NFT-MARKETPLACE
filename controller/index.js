const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')
const mysql = require('mysql');
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

// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));



// const deployedNetwork = myContract.networks["5777"];
// const contract = new web3.eth.Contract(myContract.abi,deployedNetwork.address);
// console.log(contract);

app.get('/web3Exists',(req,res)=>{
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

app.get('/createUser',(req,res) =>{
    let user ={walletAddress:'897e8Be7FBd291A389a13cC799c85503Af033dA7',name:'Ronit',bio:'good guy',email:'ronit.rawat@gmail.com',myNFT:''}
    let sql = 'INSERT INTO User SET ?';
     let query = db.query(sql, user,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('user added');
    })
})

app.get('/mintToken',async(req,res) =>{
    let sql = 'INSERT INTO Token SET ?';
   
    let token = {tokenId:'1',tokenName:'K1',tokenURI:'https://gateway.pinata.cloud/ipfs/QmUet32WRZkLk5NSyrMMaoywRoFN7uJJtscW6hoY19JwZ6?preview=1',tokenCreator:'897e8Be7FBd291A389a13cC799c85503Af033dA7',currentOwner:'897e8Be7FBd291A389a13cC799c85503Af033dA7',previousOwner:'0000000000000000000000000000000000000000',transactionHistory:[1,2,3],tokenDescription:'xyz',tokenPrice:12,forSale:false}
    token.transactionHistory = String(token.transactionHistory);
    let data = `SELECT * FROM user WHERE walletAddress ="${token.currentOwner}"`;
    // let query1 = await await db.query(data,(err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
    // });
    // let sql1 = `UPDATE User SET myNFT = myNFT+String(${token.tokenId})' WHERE walletAddress =${token.currentOwner}`;
    // let query2 = db.query(sql1,(err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
    // });
    let query = db.query(sql,token,(err,result)=>{
        if(err) throw err;
        console.log(result);
    });
    res.send('tokenMinted');
});


app.get('/transfer',async(req,res) =>{
  
    
    let sql = `UPDATE Token SET previousOwner = "897e8Be7FBd291A389a13cC799c85503Af033dA7", currentOwner = "8F8635A1416adEB6493040234EaDe4b1611910eF" WHERE tokenId = 1`;
    
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('token transfered');
    });
})

app.get('/search/:name',(req,res)=>{
    let sql = `SELECT name FROM User WHERE name = "${req.params.name}"`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('data fetched successfully');
    });
})
   


app.listen('3000',()=>{
    console.log('server started on port 3000');
})