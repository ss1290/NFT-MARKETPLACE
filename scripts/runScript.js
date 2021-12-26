const path = require('path');
const pinFileToIPFS = require('./pinFileToIPFS');

// const filePath = path.join(__dirname, '../assets/k1.png');
const filePath = path.join(__dirname, '../data/Kbird1_NFT.json');

pinFileToIPFS(filePath);