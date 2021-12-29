import React from 'react';
import './profile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Profilesettings = () => (
    <div>
       <div class="container rounded bg-white mt-5">
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="https://i.imgur.com/RqGUtoW.png" width="150"/><span class="font-weight-bold"><h2>Un-named</h2></span><span class="text-black-50"><h2>Address</h2></span><span></span></div>
        </div>
        <div class="col-md-8">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    
                    <h1 class="text-right">Edit Profile</h1>
                </div>
                <h3>User Name</h3>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="first name" /></div>
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="last name"/></div>
                </div>
                <h3>Bio</h3>
                <div class="row mt-3">
                    <div class="col-md-6"><textarea type="text" class="form-control" placeholder="Your Bio" height="300px"/></div>
            
                </div>
                <h3>Links</h3>
                <div class="row mt-4">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Your Instagram Handle " /></div>
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Your Twitter Handle"/></div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="yoursite.io" /></div>
                    <div class="col-md-6"><input type="text" class="form-control"  placeholder="Email"/></div>
                </div>
                <div class=" row mt-5 text-center"><button type="button" class="btn btn-primary "><h4>Save profile</h4></button></div>
                
            </div>
        </div>
    </div>
</div> 
        </div>
)
        
export default Profilesettings;