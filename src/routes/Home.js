import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";

const Home = () => {
  return (
  <div className="home-page">
    <Container>
      <Row>
        <Col>
          <h1>Discover, collect, and sell extraordinary NFTs </h1>
          <p>OpenMarket is the our first and largest NFT marketplace</p>
          <Link to="/AllNFT"><Button className="button" variant="primary">Explore </Button>{' '}</Link>
          <Link to="/create"><Button className="button" variant="outline-primary">Create</Button>{' '}</Link>
          
        </Col>
        <Col>
        <Link to="/Buynft">
        <button>
          <img  className="home-token" src='/img/home-token.jpg' height={200} width={200} />
          </button>
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default Home;

