import React from 'react';
import { Link } from "react-router-dom";
import '../components/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< Updated upstream
import AllNFT from './AllNFT';
const MyProfile = () => (
    <div>
        <div className='aligncenter'>
            <h1> User Profile</h1>

        </div>


        <br />


        <br /><br /><br />
        <div className="d-flex justify-content-center">
            <div className="card-body little-profile text-center">
                <div className="pro-img"><img src="https://i.imgur.com/RqGUtoW.png" alt="user" /></div>
                <h3 >Un-named</h3>

                <h3 className="m-b-0 font-light">Address</h3>

                <h3 className="m-b-0 font-light">Joined in_/_/_/</h3>


=======

import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain"
const MyProfile = () => {
    let [currentAccount, setCurrentAccount] = useState(null);
    let [userNft, setUserNft] = useState(null);
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
    const getUserNFT = () => {
        if (currentAccount) {
            let account = currentAccount.slice(2,)
            axios.get(`http://localhost:5000/getToken/${account}`).then((response) => {
                setUserNft(response.data);
            })
        }

    }
    const showProfile = () => (
        <div>
            <div className="aligncenter">
                <h1>Profile</h1>
>>>>>>> Stashed changes
            </div>
        </div>
        <div className="box">

            <div className="smallbox">
                <div className="align">
                    <p>My Collection    </p>
                    <p>Created    </p>
                    <p>Favorited   </p>
                    <Link to="/profile-settings"><img className="imgicon" src="https://img.icons8.com/ios-filled/50/000000/settings.png"/>{' '}</Link>

                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
            <div className="text-center">

                {<AllNFT />}

            </div>
            <br /><br /><br /><br /><br /><br />


            <br />
        </div>
        <br /><br /><br /><br />
    </div>
);

export default MyProfile;
