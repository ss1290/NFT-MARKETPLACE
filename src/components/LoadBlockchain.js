import { useEffect, useState } from 'react';
import contract from '../abis/OpenMarket.json';
import {useNavigate} from "react-router-dom"
import { ethers } from 'ethers';
import {address,abi} from "../config"; 

export const checkWalletIsConnected = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    console.log("Make sure you have Metamask installed!");
    return;
  } else {
    console.log("Wallet exists! We're ready to go!")
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' });
  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Found an authorized account: ", account);
    return account
  } else {
    console.log("No authorized account found");
  }
}
export const connectWalletHandler = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("Please install Metamask!");
  }
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Found an account! Address: ", accounts[0]);

    return accounts[0];
  } catch (err) {
    console.log(err)
  }
}

export const buyNftHandler = async(tokenId) => {
  try{
    const {ethereum} = window;
    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);

      console.log("Initialize payment");
      let nftTxn =  nftContract.buyNFT(tokenId);



      console.log("Mining... please wait");
       nftTxn.wait();

      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      
    }else{
      console.log("Ethereum object does not exist");
    }
  }catch(e){
    
  }
}

export const mintNftHandler = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      console.log(provider);

      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);

      console.log("Initialize payment");
      let nftTxn = await nftContract.mint();

      console.log("Mining... please wait");
      await nftTxn.wait();

      console.log(`Mined`);
      return nftTxn;
    } else {
      console.log("Ethereum object does not exist");
    }

  } catch (err) {
    console.log(err);
  }
}
