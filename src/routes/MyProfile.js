import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {Card,Button,Container,Row} from "react-bootstrap"
import axios from "axios";
import '../components/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain"
const MyProfile = () => {
    let [currentAccount, setCurrentAccount] = useState(null);
    let [userNft, setUserNft] = useState(null);
    let [userData, setUserData] = useState(null);
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
            }).catch((e)=>{
                console.log(e)
            })
        }

    }

    const getUserData = () => {
        if (currentAccount) {
            let account = currentAccount.slice(2,)
            axios.get(`http://localhost:5000/getUser/${account}`).then((response) => {
                setUserData(response.data);
            })
        }

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
                    <h3> {userData[0].name}</h3>
                    <h3 className="m-b-0 font-light">{currentAccount}</h3>
                    <h3 className="m-b-0 font-light">{userData[0].email}</h3>
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
                <div>
                    {userNft && <div>
                        <Container >
                            <Row>
                                {userNft.map((nft) => (
                                    <Card className="nft-card" key={nft.tokenId} style={{ width: '30rem' }}>
                                        <Card.Img variant="top" src={nft.url} />
                                        <Card.Body className="card-body">
                                            <Card.Title><p>{nft.itemName}</p></Card.Title>
                                            <Button variant="primary">Description</Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Row>
                        </Container>

                    </div>}

                </div>
                <br /><br /><br />
                <br />
            </div>
            <br /><br /><br /><br />
        </div>
    )
    useEffect(() => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
            getUserNFT();
            getUserData();
        }
        return loader()
    }, [currentAccount])
    return (
        <div>
            {currentAccount ? showProfile() : connectWalletButton()}

        </div>
    );
}

export default MyProfile;
