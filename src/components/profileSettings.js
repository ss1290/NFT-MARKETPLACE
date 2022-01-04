import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import './profile.css';
import axios from "axios";
import { checkWalletIsConnected, connectWalletHandler } from "./LoadBlockchain"



const sendData = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value)
    let data = {}
    data['name'] = e.target.name.value;
    data['bio'] = e.target.bio.value;
    data['email'] = e.target.email.value;
    data['insta'] = e.target.ins.value;
    data['twitter'] = e.target.twi.value;
    data['website'] = e.target.web.value;
    data['walletAddress'] = e.target.walletAddress.value.slice(2)
    axios.post('http://localhost:5000/createUser', data).then((response) => {
        alert("Profile saved")
    })

}


const Profilesettings = () => {
    let [currentAccount, setCurrentAccount] = useState(null);
    let [userNft, setUserNft] = useState(null);
    let [userData,setUserData] = useState();
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

   

    const getUserData = () => {
        if (currentAccount) {
            let account = currentAccount.slice(2,)
            axios.get(`http://localhost:5000/getUser/${account}`).then((response) => {
                console.log(response.data)
                setUserData(response.data);
            })
        }
    }

    const showProfilesettings = () => (

        <div>


            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/RqGUtoW.png" width="150" /><span className="font-weight-bold"><h2>{userData ? userData[0].name : "Un-named"}</h2></span><span className="text-black-50"><h2>{currentAccount}</h2></span><span></span></div>


            <h3 className="text-center">Edit Profile</h3>

            <div className='aligncenter'>
                <Form className="create-page-form" onSubmit={sendData}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="name" placeholder="User name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="email" placeholder="Email " required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Bio<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="bio" placeholder="Bio" required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Instagram Link<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="ins" placeholder="Instagram handle" required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Twitter Link<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="twi" placeholder="Twitter handle" required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Your Website<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="web" placeholder="yourweb.io" required />
                    </Form.Group>
                    <input name="walletAddress" type="hidden" value={currentAccount} />
                    <br />

                    <Button variant="primary" type="submit" >
                        Save Profile
                    </Button>

                </Form>
            </div>
        </div>
    )
    useEffect(() => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
           
            getUserData();

        }
        return loader()
    }, [currentAccount])
    return (
        <div>
            {currentAccount ? showProfilesettings() : connectWalletButton()}

        </div>
    );
}


export default Profilesettings;