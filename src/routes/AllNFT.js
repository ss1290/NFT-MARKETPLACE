import React, {useState,useEffect } from "react";
import axios from "axios";
import {Card,Button,Container,Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
// import Card from '../components/card'

const AllNFT = () => {
  let [allNft,setAllNft] = useState();
  const getAllNft = () => {
    axios.get(`http://localhost:5000/getAllToken`).then((response) => {
      setAllNft(response.data)
    })
  }
  useEffect(()=>{
    getAllNft();
  })
  return (
    <div>
      <h1 >All NFT</h1>
      {allNft && <div>
        <Container >
          <Row>
            {allNft.map((nft) => (
              <Card className="nft-card" key={nft.tokenId} style={{ width: '30rem' }}>
                <Card.Img variant="top" src={nft.url} />
                <Card.Body className="card-body">
                  <Card.Title><p>{nft.itemName}</p></Card.Title>
                  <Button variant="primary">Description</Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </div>}
    </div>
  )
};

export default AllNFT;