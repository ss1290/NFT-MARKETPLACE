import React from 'react';
import './profile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Profilesettings = () => (
    <div>
       <div class="container rounded bg-white mt-5">
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width="90"/><span class="font-weight-bold"><h2>John Doe</h2></span><span class="text-black-50"><h2>Address</h2></span><span>United States</span></div>
        </div>
        <div class="col-md-8">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    
                    <h2 class="text-right">Edit Profile</h2>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="first name" value="John"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="Doe" placeholder="Doe"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Email" value="john_doe12@bbb.com"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="+19685969668" placeholder="Phone number"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="address" value="D-113, right avenue block, CA,USA"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="USA" placeholder="Country"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Bank Name" value="Bank of America"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="043958409584095" placeholder="Account Number"/></div>
                </div>
                <div class="mt-5 text-center"><button>Save profile</button></div>
            </div>
        </div>
    </div>
</div> 
        </div>
)
        
export default Profilesettings;