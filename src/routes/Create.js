import React from "react";
import '../styles/create.css';
import { Form, Button, Modal,Spinner } from "react-bootstrap";
import { create } from 'ipfs-http-client'
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { checkWalletIsConnected, connectWalletHandler, mintNftHandler } from "../components/LoadBlockchain"

const client = create('https://ipfs.infura.io:5001/api/v0')

const Create = () => {
    const [tokenMinted,setTokenMinted] = useState(false);
    const [show, setShow] = useState(false);
    let [currentAccount, setCurrentAccount] = useState(null);
    const [fileUrl, setFileUrl] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fileHandler = async (e) => {
        const file = e.target.files[0];
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log("CID: ", added.path)
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
    const uploadHandler = async (e) => {
        e.preventDefault();
        
        let txn = await mintNftHandler();
        let data = {};
        data['itemName'] = e.target.item.value.trim();
        data["description"] = e.target.description.value;
        data["url"] = fileUrl;
        data["tokenCreator"] = txn.to.slice(2,);
        data["currentOwner"] = txn.from.slice(2,);
        data["previousOwner"] = "0000000000000000000000000000000000000000";
        data["forSale"] = false;
        console.log(data)
        axios.post('http://localhost:5000/mintToken', data).then((response) => {
        setTokenMinted(true)
        })
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
    useEffect(async () => {
        const account = await checkWalletIsConnected();
        setCurrentAccount(account);
    }, [])
    return (
        <div className="create-page">
            <div className="create-page-connect">
                {connectWalletButton()}
            </div>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>{tokenMinted ==true?"Token minted succesfully":"Minting token"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="spinner">
                    {tokenMinted == true?<div>
                    <Link to="/MyNFT"><Button variant="success" onClick={handleClose}>Success</Button></Link>
                    </div>:<Spinner animation="grow" variant="primary" />}
                </Modal.Body>
            </Modal>
            <div className="create-page-document">
                {currentAccount ? createNft() : <h3>Connect your wallet first</h3>}
            </div>
        </div>
    )
}



export default Create;