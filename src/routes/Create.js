import React from "react";
import '../styles/create.css';
import { Form, Button} from "react-bootstrap";
import { create } from 'ipfs-http-client'
import { useState } from "react";
import axios from "axios";
// import '../../data/controller/index';


const client = create('https://ipfs.infura.io:5001/api/v0')

const Create = () => {
    const [fileUrl, setFileUrl] = useState();
    const fileHandler = async(e) => {
        const file = e.target.files[0];
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log("CID: ",added.path)
            setFileUrl(url)
          } catch (error) {
            console.log('Error uploading file: ', error)
          } 
    }
    const uploadHandler = async(e) => {
    
        e.preventDefault();
        let data = {};
        data['itemName'] = e.target.item.value.trim();
        data["description"] = e.target.description.value;
        data["url"] = fileUrl;
        console.log(data);

axios('/mintToken',{
    method: 'POST',
    body: data,
    headers: {

     'Content-Type': 'application/json'
   }
  })
    .then(function(response) {
        return response.json()
      }).then(function(body) {
        console.log(body);
      });
  
      }
    return (
        <div className="create-page">
        <h1>Create new Item</h1>
            <Form className="create-page-form" onSubmit={uploadHandler}>
                <Form.Group className="mb-3" >
                    <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="file" placeholder="Password" onChange={fileHandler} />
                </Form.Group>
                <Form.Text className="text-muted">
                    <span style={{ color: 'red' }} >*</span>Required fields
                </Form.Text>
                <Form.Group className="mb-3" >
                    <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="item" placeholder="Item name" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" name="description" placeholder="Provide a detailed description of your item" />
                    <Form.Text className="text-muted">
                        The description will be included on the item's detail page underneath its image.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>External link</Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>
                <hr/>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    )
};


export default Create;