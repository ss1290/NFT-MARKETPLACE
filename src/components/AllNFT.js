import React from "react";
import {Link} from 'react-router-dom';

const AllNFT = ()=>(
    <div>
     <h1>Buy what you like!</h1>
     <ul>
        <li>
           <h2><Link to="/NFT/jaguar">Jaguar</Link></h2> 
        </li>
        <li>
           <h2><Link to="/NFT/mercedes">Merecedes</Link></h2> 
        </li>
     </ul>
    </div>
);

export default AllNFT;