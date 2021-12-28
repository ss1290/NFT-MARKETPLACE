import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => (
  <div className="home-page">
    <Container>
      <Row>
        <Col>
          <h1>Discover, collect, and sell extraordinary NFTs </h1>
          <p>OpenMarket is the our first and largest NFT marketplace</p>
          <Link to="/AllNFT"><Button className="button" variant="outline-primary">Explore</Button>{' '}</Link>
          <Link to="/create"><Button className="button" variant="outline-primary">Create</Button>{' '}</Link>
          
        </Col>
        <Col>
        <div className="align">
          <img className="home-token" src='/img/home-token.jpg' height={200} width={200} />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  )


export default Home;

