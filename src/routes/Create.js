import React from "react";
import '../styles/create.css';
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { create } from 'ipfs-http-client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import FormData from "form-data";
import { checkWalletIsConnected, connectWalletHandler, mintNftHandler } from "../components/LoadBlockchain"

const pinataApiKey = "4d37623cdbbfb91c7f0d";
const pinataSecretApiKey = "5043ec80f9de04cb311185b7026c84769225d2896e3a45e097a1c020d2f07251";
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'

const client = create('https://ipfs.infura.io:5001/api/v0')




const Create = () => {
    const [tokenMinted, setTokenMinted] = useState(false);
    const [show, setShow] = useState(false);
    let [currentAccount, setCurrentAccount] = useState(null);
    let [fileUrl, setFileUrl] = useState();
    let [jsonCid, setJsonCid] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const fileHandler = async (e) => {
        const file = e.target.files[0];
        let data = new FormData();
        data.append('file', file)
        try {
            axios.post(url, data, {
                headers: {
                    maxBodyLength: 'Infinity',
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            }).then((response) => {
                console.log("image uploaded")
                let imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
                setFileUrl(imageUrl)
            })
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }


    const mintToken = async (hash, base) => {
        let txn = await mintNftHandler(hash, base);
        return txn
    }


    const jsonHandler = (data) => {
        const jsonData = JSON.stringify(data);
        try {
            axios.post(jsonUrl, jsonData, {
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            }).then(async (response) => {
                setJsonCid(response.data.IpfsHash)
                let txn = await mintToken(response.data.IpfsHash, "https://gateway.pinata.cloud/ipfs/");
                data["tokenCreator"] = txn.from.slice(2,);
                data["currentOwner"] = txn.from.slice(2,);
                data["previousOwner"] = "0000000000000000000000000000000000000000";
                axios.post('http://localhost:5000/mintToken', data).then((response) => {
                })
                setTokenMinted(true);
            })
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const uploadHandler = async (e) => {
        e.preventDefault();
        let data = {};
        data['itemName'] = e.target.item.value.trim();
        data["description"] = e.target.description.value;
        data["url"] = fileUrl;
        data["TokenStandard"] = "ERC-721";
        data["BlockChain"] = "Ethereum";
        data["tokenCreator"] = currentAccount;
        data["forSale"] = false;
        // data[transactionHistory] = [];
        await jsonHandler(data);
    }
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
            </div>
        )
    }
    const createNft = () => {
        return (
            <div >
                <h1>Create new Item</h1>
                <Form className="create-page-form" onSubmit={uploadHandler}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="file" placeholder="File" onChange={fileHandler} />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }} >*</span>Required fields
                    </Form.Text>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="item" placeholder="Item name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" name="description" placeholder="Provide a detailed description of your item" />
                        <Form.Text className="text-muted">
                            The description will be included on the item's detail page underneath its image.
                        </Form.Text>
                    </Form.Group>
                    <hr />
                    <Button variant="primary" type="submit" onClick={handleShow}>
                        Create
                    </Button>
                </Form>
            </div>
        )
    }
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
        }
        return loader();
    }, [,currentAccount,jsonCid])
    return (
        <div className="create-page">
            <div className="create-page-connect">
                {connectWalletButton()}
            </div>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>{tokenMinted == true ? "Processing request" : "Request processed"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="spinner">
                    {tokenMinted == true ? <div>
                        <Link to="/MyNFT"><Button variant="success" onClick={handleClose}>Success</Button></Link>
                      
                    </div> : <Spinner animation="grow" variant="primary"   />}
                </Modal.Body>
            </Modal>
            <div className="create-page-document">
                {currentAccount ? createNft() : <h3>Connect your wallet first</h3>}
            </div>
        </div>
    )
}



export default Create;