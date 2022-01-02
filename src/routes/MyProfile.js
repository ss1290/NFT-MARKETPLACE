import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../components/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllNFT from './AllNFT';
import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain"
const MyProfile = () => {
    let [currentAccount, setCurrentAccount] = useState(null);
    const connectWalletButton = () => {
        const connectWallet = async () => {
            let account = await connectWalletHandler();
            setCurrentAccount(account)
        }
        return (
            <div>
                <button onClick={connectWallet} className='connect-wallet-button'>
                    {currentAccount ? currentAccount : 'Connect Wallet'}
                </button>
                <p>Connect your wallet first</p>
            </div>
        )
    }
    const showProfile = () => (
        <div>
            <div className="aligncenter">
                <h1>Profile</h1>
            </div>
            <br />
            <br /><br />
            <div className="d-flex justify-content-center">
                <div className="card-body little-profile text-center">
                    <div className="pro-img"><img src="https://i.imgur.com/RqGUtoW.png" alt="user" /></div>
                    <h3 >Un-named</h3>
                    <h3 className="m-b-0 font-light">{currentAccount}</h3>
                    <h3 className="m-b-0 font-light">Joined in_/_/_/</h3>
                </div>
            </div>
            <div className="box">
                <div className="smallbox">
                    <div className="align">
                        <p>My Collection    </p>
                        <p>Created    </p>
                        <p>Histroy  </p>
                        <Link to="/profileSettings"><img className="imgicon" src="https://img.icons8.com/ios-filled/50/000000/settings.png" />{' '}</Link>
                    </div>
                </div>
                {<AllNFT />}
                <br /><br /><br />
                <br />
            </div>
            <br /><br /><br /><br />
        </div>
    )
    useEffect(async () => {
        const account = await checkWalletIsConnected();
        setCurrentAccount(account);
    })
    return (
        <div>
            {currentAccount ? showProfile() : connectWalletButton()}

        </div>
    );
}

export default MyProfile;
