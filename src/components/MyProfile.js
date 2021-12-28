import React from 'react';
import './profile.css'

const MyProfile = () => (
    <div>
        

        <div className="align">
        <h1>Profile</h1>
        <div className="align-end">
        <img src="https://img.icons8.com/ios-filled/50/000000/settings.png"/>
        <h2>Profile Settings</h2>
        </div>
        </div>
        <br />

        <div className="col-md-7">
            <br /><br /><br />
            <div class="d-flex justify-content-center">
                <div className="card-body little-profile text-center">
                    <div className="pro-img"><img src="https://i.imgur.com/RqGUtoW.png" alt="user" /></div>
                    <h3 className="m-b-0">Un-named</h3>

                    <div className="row text-center m-t-20">
                        <div className="col-lg-4 col-md-4 m-t-20">
                            <h3 className="m-b-0 font-light">Address</h3>
                        </div>
                        <div className="col-lg-4 col-md-4 m-t-20">
                            <h3 className="m-b-0 font-light">Joined in_/_/_/</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="box">

            <div className="smallbox">
                <div className="align">
                <p>My Collection    </p> 
                <p>Created    </p> 
                <p>Favorited   </p> 
                <p>Hidden    </p> 
                <p>Acitvity</p>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
            <div className="text-center">
            <h2>
                No items to display
            </h2>
            </div>
            <br /><br /><br /><br /><br /><br />


            <br />
        </div>
        <br /><br /><br /><br />
    </div>
);

export default MyProfile;