import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain"
import axios from "axios";
import AllNFT from './AllNFT';
import "../styles/myNft.css"

const MyNFT = () => {
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

            const params = new URLSearchParams(window.location.search);
            const searchData = params.get('search')
            if (searchData) {
                axios.get(`http://localhost:5000/searchMynft/${account}?search=${searchData}`).then((response) => {
                    setUserNft(response.data)
                })
            }

            else {
                axios.get(`http://localhost:5000/getToken/${account}`).then((response) => {
                    setUserNft(response.data);
                })
            }
        }
    }
    

    
    const showUserNFT = () => (
        <div>
            <h1>My collection</h1>
            {userNft && <div>
                <Container >
                    <Row>
                        {userNft.map((nft) => {
                            let link = `/Sellnft/${nft.tokenId}`
                            return (
                                <Card className="nft-card" key={nft.tokenId} style={{ width: '30rem' }}>
                                    <Card.Img variant="top" src={nft.url} />
                                    <Card.Body className="card-body">
                                        <Card.Title><p>{nft.itemName}</p></Card.Title>
                                        <Card.Link style={{ textDecoration: 'none' }} href={link}><Button variant="primary">Description</Button></Card.Link>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Row>
                </Container>

            </div>}

        </div>
    )
    const accountChanged = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }
        ethereum.on("accountsChanged", (accounts) => {
            setCurrentAccount(accounts[0]);
        })

    }
    useEffect(() => {
        accountChanged();
    })
    useEffect(() => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
            getUserNFT();
        }
        return loader()
    }, [currentAccount])

    return (
        <div>
            {currentAccount ? showUserNFT() : connectWalletButton()}
        </div>
    );

    
}

export default MyNFT;