import React from "react";
import {ethers , BigNumber} from ethers;
import Abi from '../abis/OpenMarket.json';
import { useEffect , useState } from "react";


const contract_address ="";

function App(){

    const [accounts , setAccounts] = useState([]);

    async function connectAccounts(){

        if (window.ethereum ) {
			console.log('MetaMask Here!');

			const accounts =window.ethereum.request({ method: 'eth_requestAccounts'})
            setAccounts(accounts)

			
    }
}

useEffect(()=>{
    connectAccounts();
},[])

const [mintamount ,]
}