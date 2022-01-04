import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, ListGroup, Accordion, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import { SiEthereum } from 'react-icons/si';
import { BiDetail, BiTransfer } from 'react-icons/bi';
import { RiArrowUpDownFill, } from 'react-icons/ri';
import { MdChildFriendly } from 'react-icons/md';
import { AiOutlineWallet } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { CgDetailsMore } from 'react-icons/cg';
import "../styles/buynft.css";
import axios from "axios";
import { tokenUriHandler } from "../components/LoadBlockchain";


import { useParams } from "react-router-dom";


const Buynft = () => {
  const [nftData, setNftData] = useState();
  let params = useParams();
  const getTokenUri = async () => {
    console.log(params.nftId)
    let tokenUri = await tokenUriHandler(params.nftId);
    console.log(tokenUri)
    axios.get(tokenUri.uri).then((response) => {
      console.log(response.data)
      const data = JSON.parse(Object.keys(response.data))
      data["contractAddress"] = tokenUri.address;
      data["nftOwner"] = tokenUri.owner;
      axios.get(`http://localhost:5000/getUser/${data.nftOwner.slice(2,)}`).then((response) => {
        console.log(response.data[0].name)
        data['tokenOwnerName'] = response.data[0].name;
        setNftData(data)
      })

    })
  }
  const saleCard = () => (
    <Card className='cards' style={{ width: '45rem' }}>
      <Card.Header as="h4" ><BsClock style={{ color: 'black' }} />Sale ends June 26, 2022 at 7:30pm IST </Card.Header>
      <Card.Body responsive>
        <Card.Title as="h4">Current price</Card.Title>
        <Card.Text as="h1" ><SiEthereum style={{ color: 'black' }} />1.3</Card.Text>

        <div className='btn1'>
          <Button variant="primary" size="lg" style={{ width: "117px", height: "30px", borderRadius: "12px" }}>
            <AiOutlineWallet />Buy</Button>
        </div>
      </Card.Body>
    </Card>
  )
  const setSaleCard = () => (
    <Card className='cards' style={{ width: '45rem' }}>
      <Card.Header as="h3" >Sell token</Card.Header>
      <Card.Body responsive>
        <Card.Title as="h4">Current price</Card.Title>
        <Card.Text as="h1" ><SiEthereum style={{ color: 'black' }} />0</Card.Text>

        <div className='btn1'>
          <form>
            <input type="text" placeholder='set price'/>
            <Button variant="primary" size="lg" style={{ width: "117px", height: "30px", borderRadius: "12px" }}>
              <AiOutlineWallet />Sell</Button>
          </form>

        </div>
      </Card.Body>
    </Card>
  )
  useEffect(() => {
    getTokenUri();
  }, [])
  return (
    <div className="home-page" >
      <Container >
        <Row>
          <Col>
            <div className='title'>
              <h1>{nftData ? nftData.itemName : "token"} </h1>
              <p>owned by:  <Card.Link style={{ textDecoration: 'none' }} href="#">{nftData ? nftData.tokenOwnerName : "Unknown"}</Card.Link></p>
            </div>
          </Col>
          <Col>
            <div className='title'>
              {setSaleCard()}
            </div>
          </Col>


          <div className='col1'>
            <Col responsive>
              <Link to="/Buynft">
                <button >
                  <img className="home-token" src={nftData ? nftData.url : "image"} height={200} width={200} />
                </button>
              </Link>

              <Card className='card2' style={{ width: '40rem' }} >

                <Card.Body >
                  <Card.Title as="h2"><CgDetailsMore style={{ color: 'black' }} />Description</Card.Title>

                </Card.Body>
                <ListGroup className="list-group-flush" responsive>
                  <Card.Text className="cardtext" as="h5">
                    Created by: {nftData ? nftData.tokenCreator : ''}
                    <p>{nftData ? nftData.description : ''}</p>
                  </Card.Text>
                </ListGroup>

                <Accordion className='details' defaultActiveKey="0" flush responsive>
                  <Accordion.Item className='accitem' eventKey="0" responsive>
                    <Accordion.Header responsive><h3><BiDetail style={{ color: 'black' }} />Details</h3></Accordion.Header>
                    <Accordion.Body responsive>
                      <h4>Contract Address: {nftData ? nftData.contractAddress : ''}</h4>
                      <h4>Token ID: {params.nftId ? params.nftId : ''}</h4>
                      <h4>Token Standard: {nftData ? nftData.TokenStandard : ''}</h4>
                      <h4>Blockchain: {nftData ? nftData.BlockChain : ''}</h4>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </Card>
            </Col>
          </div>

          <div className='title2'>
            <Col>
              <Card>
                <Accordion className='details' defaultActiveKey="0" flush responsive>
                  <Accordion.Item className='accitem2' eventKey="0" responsive>
                    <Accordion.Header className='accheader' responsive><h3><RiArrowUpDownFill style={{ color: 'black' }} />Item Activity</h3></Accordion.Header>
                    <Accordion.Body responsive>
                      <Table responsive size="lg" striped bordered hover>
                        <thead>

                          <tr style={{ fontSize: '18px', fontStyle: 'oblique' }}>
                            <th>Event</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ fontSize: '15px' }}>
                            <td><BiTransfer style={{ color: 'darkslategrey' }} /> Transfer</td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">3CCFDC</Card.Link></td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">B9E820</Card.Link></td>
                            <td >29 december 2021</td>
                          </tr>
                          <tr style={{ fontSize: '15px' }}>
                            <td><MdChildFriendly style={{ color: 'darkslategrey' }} /> minted</td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">3CCFDC</Card.Link></td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">B9E820</Card.Link></td>
                            <td >29 december 2021</td>
                          </tr>
                        </tbody>
                      </Table>
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