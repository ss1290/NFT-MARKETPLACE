import React from 'react';
import { Button, Container, Row, Col,Card,ListGroup,Accordion } from "react-bootstrap";
import {Link} from "react-router-dom";
import { SiEthereum } from 'react-icons/si';
import { BiDetail} from 'react-icons/bi';
import {AiOutlineWallet } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { CgDetailsMore } from 'react-icons/cg'
import "../styles/buynft.css";

const Buynft = ()=> {
    return (
        <div className="home-page">
    <Container>
    <Row>
      <Col>
      <div className='title'>
        <h1>K1 cryto </h1>
        <p>owned by:  <Card.Link style={{textDecoration:'none'}} href="#">ABC</Card.Link></p>
      </div>
      </Col>
      <div className='title'>
      <Card className='cards'  style={{ width: '45rem' }}>
  <Card.Header as="h4" ><BsClock style={{color: 'black'}}/>Sale ends June 26, 2022 at 7:30pm IST </Card.Header>
  <Card.Body>
    <Card.Title as="h4">Current price</Card.Title>
    <Card.Text as="h1"><SiEthereum style={{color: 'black'}} />1.3</Card.Text>
 
    <div className='btn1'>
    <Button  variant="primary" size="lg" style={{ width: "117px", height: "30px",borderRadius: "12px"}}>
    <AiOutlineWallet />Buy</Button>
    </div>

  </Card.Body>
</Card>
        </div>
        <div className='col1'>
      <Col>
      <Link to="/Buynft">
      <button >
        <img  className="home-token" alt="test-token" src='/img/home-token.jpg' height={200} width={200} />
        </button>
        </Link>

        <Card className='card2' style={{ width: '40rem' }}>
 
  <Card.Body>
    <Card.Title as="h2"><CgDetailsMore />Description</Card.Title>
 
  </Card.Body>
  <ListGroup className="list-group-flush">
  <Card.Text className="cardtext" as="h5">
    Created by:
    </Card.Text>
  </ListGroup>
 
  <Accordion className='details' defaultActiveKey="0" flush >
  <Accordion.Item className='accitem' eventKey="0">
    <Accordion.Header><h3><BiDetail style={{color: 'black'}} />Details</h3></Accordion.Header>
    <Accordion.Body>
    <h4>Contract Address</h4>
    <h4>Token ID</h4>
    <h4>Token Standard</h4>
    <h4>Blockchain</h4>
    <h4>Metadata</h4>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
 
</Card>

      </Col>
      </div>
    </Row>
  </Container>
  </div>
    )
    };

export default Buynft;