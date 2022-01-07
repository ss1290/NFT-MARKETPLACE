const mysql = require('mysql');
//Create connection
const db = mysql.createConnection({ 
    host     : 'localhost',
    user     : 'root', 
    database : 'MYNFT'
});
//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// // Creation of Database
// let sql1 = 'CREATE DATABASE MYNFT';
// db.query(sql1, (err,result)=>{
//     if(err) throw err;
//     console.log(result);
// // })

let sql2 = 'CREATE TABLE User(walletAddress VARCHAR(255), name VARCHAR(255),bio VARCHAR(255),email VARCHAR(255),insta VARCHAR(255),twitter VARCHAR(255),website VARCHAR(255), PRIMARY KEY (email))';
db.query(sql2, (err,result)=>{
    if(err) throw err;
    console.log(result);
})


let sql3 = 'CREATE TABLE Token(tokenId int AUTO_INCREMENT, itemName VARCHAR(255), url VARCHAR(255),tokenCreator VARCHAR(255),currentOwner VARCHAR(255),previousOwner VARCHAR(255),transactionHistory VARCHAR(255),description VARCHAR(255), tokenPrice int,forSale BOOLEAN,tokenStandard VARCHAR(255), blockchain VARCHAR(255),PRIMARY KEY (tokenId)) '; 
    db.query(sql3, (err,result)=>{
        if(err) throw err;
        console.log(result);
})


