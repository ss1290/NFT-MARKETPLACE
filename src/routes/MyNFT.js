import React,{useState,useEffect} from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AllNFT from './AllNFT';
const MyNFT = () =>{
    let [currentAccount,setCurrentAccount] = useState("0xcbF8aC44Fbb55587aC86bc25cccBfb8030987e96");
    const getUserNFT = async()=>{
        let account = currentAccount.slice(2,) 
        await axios.get(`http://localhost:5000/getToken/${account}`).then((response)=>{
            console.log(response);
        })
    }
    useEffect(()=>{
        getUserNFT();
    })
    return (
        <div>
            <h1>Your collection</h1>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example 
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    
        </div>
    );
}

export default MyNFT;