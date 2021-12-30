const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')
const mysql = require('mysql');
var cors = require('cors')
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

app.use(express.json())
app.use(cors())

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

app.get('/createUser',(req,res) =>{
    let user ={walletAddress:'897e8Be7FBd291A389a13cC799c85503Af033dA7',name:'Ronit',bio:'good guy',email:'ronit.rawat@gmail.com',myNFT:''}
    let sql = 'INSERT INTO User SET ?';
     let query = db.query(sql, user,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('user added');
    })
})
app.post('/mintToken',async(req,res) =>{
    let sql = 'INSERT INTO Token SET ?';
    let token = req.body;
    console.log(req.body)
    let query = db.query(sql, token,(err,result)=>{
        if(err) throw err;
        console.log(result);
    });
    // let sql1 = `UPDATE User SET myNFT = concat(myNFT,${req.body.tokenId},",") WHERE walletAddress ='${req.body.currentOwner}'`;
    // let query2 = db.query(sql1,(err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
    // });
    res.send('token minted');
});


// app.get('/transfer',async(req,res) =>{
//     const addresses = await web3.eth.getAccounts();
//     console.log(updateList);
//     let sql = `UPDATE Token SET previousOwner = '${transfer.transferFrom}', currentOwner = '${transfer.transferTo}' WHERE tokenId = ${transfer.tokenId}`;
//     let query = db.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('token transfered');
//     });
// })

app.listen('5000',()=>{
    console.log('server started on port 5000');
})