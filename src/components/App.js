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

      
        const networkId = await web3.eth.net.getId()
        const networkData = KryptoBird.networks[networkId]
         if(networkData) {
            
             const abi = KryptoBird.abi;
             const address = networkData.address; 
             const contract = new web3.eth.Contract(abi, address)
             this.setState(()=>({contract}))

            
             

            const name = await contract.methods.name().call()
            this.setState({name})

            const symbol = await contract.methods.symbol().call()
            this.setState({symbol})
            const mint = await contract.methods.mint().send()
            this.setState({mint})
            
            
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

<p>{this.state.name}</p>

<p>{this.state.symbol}</p>







            </div>
            
        )
    }
}

export default App;