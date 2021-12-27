import React from 'react';
import './profile.css';

const MyProfile = ()=>(
    <div>
        
    <h1>Profile</h1>
        
        <br/>
      
    <div className="col-md-7">
    <br/><br/><br/>
    <div class="d-flex justify-content-center">
            <div className="card-body little-profile text-center">
                <div className="pro-img"><img src="https://i.imgur.com/8RKXAIV.jpg" alt="user"/></div>
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
</div>
);

export default MyProfile;