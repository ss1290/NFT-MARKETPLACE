import React from "react";
import '../styles/create.css';
import { Form, Button} from "react-bootstrap";
import { useState } from "react";



const Create = () => {
    const [selectedFile, setSelectedFile] = useState();
    const fileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(selectedFile)
    }
    return (
        <div className="create-page">
        <h1>Create new Item</h1>
            <Form className="create-page-form">
                <Form.Group className="mb-3" >
                    <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="file" placeholder="Password" onChange={fileHandler} />
                </Form.Group>
                <Form.Text className="text-muted">
                    <span style={{ color: 'red' }} >*</span>Required fields
                </Form.Text>
                <Form.Group className="mb-3" >
                    <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" placeholder="Item name" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" placeholder="Provide a detailed description of your item" />
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