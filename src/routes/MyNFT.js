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
            axios.get(`http://localhost:5000/getToken/${account}`).then((response) => {
                setUserNft(response.data);
            })
        }

    }
    const showUserNFT = () => (
        <div>
            <h1>My collection</h1>
            {userNft && <div>
                <Container >
                    <Row>
                        {userNft.map((nft) =>(
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
    )
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