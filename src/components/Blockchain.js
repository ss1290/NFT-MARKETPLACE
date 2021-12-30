import openMarketContractJSON from "../abis/OpenMarket.json";
import "../styles/app.css"
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

const contractAddress = "0x5D49E36896194cEc0018c1ab800ba358bB5f8AB4";
const contractAbi = openMarketContractJSON.abi;

const App = () => {
    const [currentAccount, setCurrentAccount] = useState();
    const checkWalletIsConnected = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Metamask is not available, Install it first")
            return;
        } else {
            console.log("Metamask available,ready to go")
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorised account: ", account);
            setCurrentAccount(account)
        } else {
            console.log("No authorised account found")
        }
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Install metaask first")
        }
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("found an account", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }
    const ownerHandler = async()=>{
        const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                console.log(signer)
                const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

                console.log("Initialize payment");
                console.log(currentAccount)
                let nftTxn = await nftContract.balanceOf(currentAccount);

                console.log("Mining... please wait");
                console.log(nftTxn)

                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
            } else {
                console.log("Ethereum object does not exist")
            }
    }
    const mintNftHandler = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                console.log(signer)
                const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

                console.log("Initialize payment");
                let nftTxn = await nftContract.mint();

                console.log("Mining... please wait");
                await nftTxn.wait();

                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
            } else {
                console.log("Ethereum object does not exist")
            }
        } catch (e) {

        }
    }

    const connectWalletButton = () => {
        return (
            <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
                Connect Wallet
            </button>
        )
    }

    const mintNftButton = () => {
        return (
            <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
                Mint NFT
            </button>
        )
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    return (
        <div className='main-app'>
            <h1>Scrappy Squirrels Tutorial</h1>
            <div>
                {currentAccount ? mintNftButton() : connectWalletButton()}
                <button onClick={ownerHandler} className='cta-button mint-nft-button'>
                    balance
                </button>
            </div>
        </div>
    )
}

export default App;
