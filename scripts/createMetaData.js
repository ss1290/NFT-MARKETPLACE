const fs = require("fs");

var metaDataSchema=
{
  description:'',
  image: "https://ipfs.io/ipfs/",
  name: ""
}
let addData = function(_description,_name,hashedValue){
  metaDataSchema["description"]= _description;
  metaDataSchema["name"] = _name;
  metaDataSchema["image"] = metaDataSchema["image"] + hashedValue;
  fs.writeFileSync(`../data/${_name}_NFT.json`,JSON.stringify(metaDataSchema))
} 

module.exports = addData;

