import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/OpenMarket.json'

import './App.css';

class App extends Component {


       test = ()=>{
      console.log("23232")
    }
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // first up is to detect ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        // modern browsers
        // if there is a provider then lets
        // lets log that it's working and access the window from the doc
        // to set Web3 to the provider 
        
        if(provider) {
            console.log('ethereum wallet is connected')
            window.web3 = new Web3(Web3.givenProvider   )
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account:accounts[0]})

        // create a constant js variable networkId which 
        //is set to blockchain network id 
        const networkId = await web3.eth.net.getId()
        const networkData = KryptoBird.networks[networkId]
         if(networkData) {
             // EXERCISE TIME!!!! :)
             // 1. create a var abi set to the Kryptobird abi
             // 2. create a var address set to networkData address
             // 3. create a var contract which grabs a 
             //new instance of web3 eth Contract  
             // 4. log in the console the var contract successfully - GOOD LUCK!!!!

             const abi = KryptoBird.abi;
             const address = networkData.address; 
             const contract = new web3.eth.Contract(abi, address)
             this.setState(()=>({contract}))

            
             const totalSupply = await contract.methods.totalSupply().call()
            this.setState({totalSupply})
            
            
         } else {
             window.alert('Smart contract not deployed')
         }
    }

 
    constructor(props) {
         super(props);
         this.state = {
             account: '',
             contract:null,
             totalSupply:0,
             kryptoBirdz:[]
         }
    }

            

    render() {
        
        return (
            <div>
                 Open Market
<button onClick={this.test}> Connect wallet</button>
<p>{this.state.account}</p>


            </div>
            
        )
    }
}

export default App;