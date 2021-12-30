
import React  , {Component} from "react";

import web3 from 'web3';


const Login = ()=>{

    const publicAddress = web3.eth.coinbase.toLowerCase();

    handleClick = () => {
        
        fetch(`url/users?publicAddress=${publicAddress}`)
          .then(response => response.json())
        
          .then(
            users => (users.length ? users[0] : this.handleSignup(publicAddress))
          )
          // Popup MetaMask confirmation modal to sign message
          .then(this.handleSignMessage)
          // Send signature to back end on the /auth route
          .then(this.handleAuthenticate)
          // --snip--
      };


            handleSignup = publicAddress =>{
            fetch(`url/users`, {
                body: JSON.stringify({ publicAddress }),
                headers: {
                'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(response => response.json());
          }


    
      handleSignMessage = ({ publicAddress, nonce }) => {
        return new Promise((resolve, reject) =>
          web3.personal.sign(
            web3.fromUtf8(`I am signing nonce: ${nonce}`),
            publicAddress,
            (err, signature) => {
              if (err) return reject(err);
              return resolve({ publicAddress, signature });
            }
          )
        );
      };

    
      handleAuthenticate = ({ publicAddress, signature }) =>
        fetch(`url/auth`, {
          body: JSON.stringify({ publicAddress, signature }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(response => response.json());

        return (
            <div>
               
                <button className="Login-button Login-mm" onClick={handleClick}>
                   click me
                </button>
               
            </div>
        );


}
   
  