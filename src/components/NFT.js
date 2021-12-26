import React from "react";
import {useParams} from "react-router-dom";

const NFT = ()=>{
    let params = useParams();
    return(
    <div>    
        {<h1>{params.NFTname}</h1>}
        <p>This NFT belongs to None</p>
    </div>
)};

export default NFT;
