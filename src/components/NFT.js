import React from "react";
import {useSearchParams,useParams} from "react-router-dom";

const NFT = (props)=>{
    const[searchParams,setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    let params = useParams();
    return(
    <div>    
        {<h1>{params.NFTname.toLocaleUpperCase()}</h1>}
        <p>This NFT belongs to None</p>
    </div>
)};

export default NFT;
