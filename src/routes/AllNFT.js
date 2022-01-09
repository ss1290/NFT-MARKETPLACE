import React, {useState,useEffect } from "react";
import axios from "axios";
import {Card,Button,Container,Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
// import Card from '../components/card'

const AllNFT = ({history}) => {
  
  let [allNft,setAllNft] = useState();
  const getAllNft = () => {
    const params = new URLSearchParams(window.location.search);
    const searchData = params.get('search')
    if(searchData ){
      console.log("hello")
    
      axios.get(`http://localhost:5000/tokenSearch?search=${searchData}`).then((response) => {
      setAllNft(response.data)
    })
    }else{
      axios.get(`http://localhost:5000/getAllToken`).then((response) => {
      setAllNft(response.data)
    })
    }
    
  }
  useEffect(()=>{
    getAllNft();
  },[])
  return (
    <div>
      <h1 >All NFT</h1>
      {allNft && <div>
        <Container >
          <Row>
            {allNft.map((nft) => {
              let link = `/Buynft/${nft.tokenId}`
              return(
                <Card className="nft-card" key={nft.tokenId} style={{ width: '30rem' }}>
                <Card.Img variant="top" src={nft.url} />
                <Card.Body className="card-body">
                  <Card.Title><p>{nft.itemName}</p></Card.Title>
                  <Card.Link style={{textDecoration:'none'}} href={link}>
                  <Button  variant="primary">Buy</Button>
                  </Card.Link>
                </Card.Body>
              </Card>
              )
            })}
          </Row>
        </Container>
      </div>}
    </div>
  )
};

export default AllNFT;