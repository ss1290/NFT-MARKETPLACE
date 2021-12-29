import React, {useState} from 'react'
import {ethers} from 'ethers'
import '../styles/WalletCard.css'
import { useEffect } from 'react'



const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
				console.log(errorMessage)
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage( <span>
				<p>
				  {" "}
				  🦊{" "}
				  <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
					You must install Metamask, a virtual Ethereum wallet, in your
					browser.
				  </a>
				</p>
			  </span>);
		}
	}
	
	useEffect(()=>{
		const account =localStorage.getItem('Account');
		const balance = localStorage.getItem('Balance')
		if(account && balance){
			setDefaultAccount(account);
			setUserBalance(balance);
		}
		

	},[]);
	useEffect(()=>{
		const account =localStorage.getItem('Account');
		if(!account){
			setConnButtonText("Connect Wallet");
		}
		localStorage.setItem('Account' , defaultAccount);
		localStorage.setItem('Balance' , userBalance);
	},[defaultAccount, userBalance]);

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		setUserBalance('');
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};
	const disconnectHandler = ()=>{
		console.log("disconnected")
	}
	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}
	if (window.ethereum && window.ethereum.isMetaMask) {

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('disconnect',disconnectHandler)
	window.ethereum.on('chainChanged', chainChangedHandler);
	}
	return (
		<div className='walletCard'>
		<h4> {"Connection to MetaMask 🦊 using window.ethereum methods"} </h4>
		
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			

		</div>
	);
}

export default WalletCard;