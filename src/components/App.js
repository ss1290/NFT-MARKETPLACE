import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/OpenMarket.json'


class App extends Component {

    
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        const provider = await detectEthereumProvider();
        console.log(provider,"grgegh")
        
        
        if(provider) {
            console.log('ethereum wallet is connected')
    
            var web3 = new Web3();

            await window.web3.currentProvider.enable()
            window.web3 = new Web3(web3.currentProvider  || "HTTP://127.0.0.1:7545")
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts, "tuudui")
        const account = accounts[0]
        this.setState({account:accounts[0]})
        console.log(accounts)

      
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


           

            
            
         } else {
             window.alert('Smart contract not deployed')
         }
    }

 
    constructor(props) {
         super(props);
         this.state = {
             account: '',
             contract:null,
            
         }
    }

            

    render() {
        
        return (
            <div>
                 Open Market

<p>{this.state.account}</p>

<p>{this.state.name}</p>
<p>{this.state.total}</p>
<p>{this.state.symbol}</p>








            </div>
            
        )
    }
}

export default App;