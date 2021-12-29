const fs = require('fs').promises;
const path = require('path');

const storeDataToFile = async (jsonData) => {
  try {
    const filePath = path.join(__dirname, "../data/ipfsHash.json");
    const ipfsFileExists = await fileExists(filePath);
    if (!ipfsFileExists) {
      console.log('ipfsFileExists: ', ipfsFileExists);
      // First time creating an empty file with [].
      // We will be storing all ipfsHashes as array of objects
      await fs.writeFile(filePath, JSON.stringify([]));
    }
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    json.push(jsonData);
    await fs.writeFile(filePath, JSON.stringify(json));
  } catch (err) {
    console.log('Error occured while storing data to file', err);
  }
};

async function fileExists(path) {
  try {
    const res = await fs.access(path);
    return true;
  } catch (err) {
    if (err.code == 'ENOENT') {
      return false;
    }
    console.log('Exception fs.statSync (' + path + '): ' + err);
    // some other exception occurred
    throw err;
  }
}
module.exports = {
  storeDataToFile,
  fileExists,
};