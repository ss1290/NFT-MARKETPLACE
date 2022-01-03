import React from 'react';
import { Link } from "react-router-dom";
import '../components/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
