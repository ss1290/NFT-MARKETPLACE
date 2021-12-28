import React from "react";
import "./Card.css";
import { Card } from "react-bootstrap";

const reactCard= ({cardInfo}) => {
  
  const renderCard = cardInfo.map((card, index) => {
    return (
       
         
      <Card style={{ width: "1rem" }} key={index} className="box">
        <Card.Img variant="top" src="holder.js/50px180" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
        </Card.Body>
      </Card>
      
      
    );
  });

  return <div className="grid">{renderCard}</div>;
};

export default reactCard;