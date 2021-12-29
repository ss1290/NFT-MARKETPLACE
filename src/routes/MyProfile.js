import React from 'react';
import {Link} from "react-router-dom";
import '../components/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllNFT from './AllNFT';
const MyProfile = () => (
    <div>
        

        <div className="align">
        <h1>Profile</h1>
        <div className="align-end">
        
        <Link to="/profileSettings"><img className="imgicon" src="https://img.icons8.com/ios-filled/50/000000/settings.png"/>{' '}</Link>
        
       
        </div>
        </div>
        <br />

        
            <br /><br /><br />
            <div className="d-flex justify-content-center">
                <div className="card-body little-profile text-center">
                    <div className="pro-img"><img src="https://i.imgur.com/RqGUtoW.png" alt="user" /></div>
                    <h3 >Un-named</h3>

                   <h3 className="m-b-0 font-light">Address</h3>
                      
                    <h3 className="m-b-0 font-light">Joined in_/_/_/</h3>
            
                    
                </div>
        </div>
        <div className="box">

            <div className="smallbox">
                <div className="align">
                <p>My Collection    </p> 
                <p>Created    </p> 
                <p>Favorited   </p> 
                <p>Hidden    </p> 
               
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
            <div className="text-center">
            
                {<AllNFT/>}
            
            </div>
            <br /><br /><br /><br /><br /><br />


            <br />
        </div>
        <br /><br /><br /><br />
    </div>
);

export default MyProfile;
