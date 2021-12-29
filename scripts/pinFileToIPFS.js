const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { storeDataToFile } = require('./ipfsHelper.js');
const addData = require('./createMetaData.js');
 
// Calls Pinata API's to pin file to IPFS
const pinFileToIPFS = async (filePath) => {
  const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const pinataApiKey = "0588ce808d7671a3fa17";
  const pinataApiSecret = "d6c5f497309ac1197b98aae1207e6f33ab25bca5cfcddd8af6470b1a47de56d6";
  const form_data = new FormData();
  try {
    form_data.append('file', fs.createReadStream(filePath));
    const request = {
      method: 'post',
      url: pinataEndpoint,
      maxContentLength: 'Infinity',
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
        'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
      },
      data: form_data,
    };
    console.log('request:', request);
    const response = await axios(request);
    console.log('Successfully pinned file to IPFS : ', response);
    await storeDataToFile(response.data);
    console.log('Successfully added IPFS response to json file');
    console.log(request)
    addData('This is the first cute bird','Kbird1',response.data.IpfsHash);
  } catch (err) {
    console.log('Error occurred while pinning file to IPFS: ', err);
  }
};

module.exports = pinFileToIPFS;