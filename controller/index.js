const express = require('express');
const Web3 = require('web3');
const myContract = require('../src/abis/OpenMarket.json')
const mysql = require('mysql');
const cors = require('cors')
 

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

app.use(express.json());
app.use(cors());

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

app.post('/createUser',(req,res) =>{
    let user =req.body
    let sql = 'INSERT INTO User SET ?';
     console.log(req.body);
     let query = db.query(sql, user,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('user added');
    })
})

app.post('/mintToken',async(req,res) =>{
    let sql = 'INSERT INTO Token SET ?';
    let token = req.body
    let query = db.query(sql, token,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('token minted');
    });
});


app.get('/getUser/:address', async(req,res)=>{
    let sql = `SELECT * FROM User HAVING walletAddress = '${req.params.address}'`
     db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/getToken/:address',async(req,res) =>{
   
    let sql = `SELECT * FROM Token HAVING currentOwner='${req.params.address}'`
    console.log(req.params.address)
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });

})

app.get('/searchMynft/:address',async(req,res)=>{

    let result = req.query.search ;

    if(result)
    {
        
        let sql1= `SELECT * FROM Token WHERE itemName LIKE '${result}%' AND currentOwner='${req.params.address}' `
        console.log(result)
        db.query(sql1,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result);
        });

    }


})

app.patch('/updateProfile/:address',async(req,res)=>{
    let update = req.body;
    let sql = `UPDATE User SET ?  WHERE walletAddress='${req.params.address}'`;
    db.query(sql,update,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('profile updated');
    });
})

app.get('/getAllToken',async(req,res) =>{
    let sql = `SELECT * FROM Token WHERE forSale=true `
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/tokenSearch',async(req,res)=>{
    const result = req.query.search;
    console.log(result, "----")

    let sql = `SELECT * FROM Token WHERE itemName LIKE '${result}%' OR tokenId ='${result}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('data fetched successfully');
        res.send(result);
    });
})


app.patch('/transfer/:nftId/:preowner/:postowner',async(req,res) =>{
   
    let sql = `UPDATE Token SET previousOwner = '${req.params.preowner}', currentOwner = '${req.params.postowner}',forSale=false WHERE tokenId = '${req.params.nftId}'`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('token transfered');
    });
})

app.patch('/tokenForSale/:tokenId/:price', (req,res) =>{
    console.log(req.params)
    let sql = `UPDATE Token  SET forSale = true ,tokenPrice ='${req.params.price}' WHERE tokenId = ${req.params.tokenId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Successfully set to sale');
   });
})

app.get('/tokenSearch',async(req,res)=>{
    const result = req.query.search;
    console.log(result, "----")

    let sql = `SELECT * FROM Token WHERE itemName LIKE '${result}%' OR tokenId ='${result}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.patch('/removeTokenFromSale/:tokenId', (req,res) =>{
    let sql = `UPDATE Token  SET forSale = false WHERE tokenId = ${req.params.tokenId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Successfully remove from sale');
   });
})

app.patch('/priceChange/:price/:tokenId',(req,res)=>{
    let sql = `UPDATE Token SET tokenPrice='${req.params.price}' WHERE tokenId = '${req.params.tokenId}'`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('price changed successfully')
    })
})
app.patch('/removeFromSale/:tokenId',(req,res)=>{
    let sql = `UPDATE Token SET forSale=false, tokenPrice=0 WHERE tokenId='${req.params.tokenId}'`
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Token removed from sale successfully');
    })
})

app.listen('5000',()=>{
    console.log('server started on port 5000');
})