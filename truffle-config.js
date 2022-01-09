const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {

  networks: {
    development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 7545,            // Standard Ethereum port (default: none)
    network_id: "*",       // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider("bonus neutral weapon jelly track art relax motion pool insane gasp crush", "https://ropsten.infura.io/v3/fc489a78a481470c8b82c9d80f1f0934"),
      network_id: 3,
      gas: 8000000,
      gasPrice: 10000000000
    },
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis',

  compilers: {
    solc: {
     version:'^0.8.0',
     optimizer:{
       enabled:'true',
       runs: 200
     }
    }
  },
};
