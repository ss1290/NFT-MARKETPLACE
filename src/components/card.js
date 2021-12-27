import React from "react";
import "./Card.css";
import { Card } from "react-bootstrap";

const reactCard= () => {
  const cardInfo = [
    
    {
      image:
        "/img/k1.png",
      title: "Steph Curry",
      text: "he good",
    },
    {
      image:
      "/img/k2.png",
      title: "Michael Jordan",
      text: "he is very close to goat",
    },
    {
      image: "/img/k3.png",
      title: "Lebron James",
      text: "THE GOAT",
    },
    {
      image:
      "/img/k4.png",
      title: "Alex Caruso",
      text: "THE TRUE GOAT",
    },
    {
      image:
      "/img/k5.png",
      title: "Steph Curry",
      text: "he good",
    },
    {
      image:
        "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
      title: "Michael Jordan",
      text: "he is very close to goat",
    },
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      title: "Lebron James",
      text: "THE GOAT",
    },
    {
      image:
        "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
      title: "Alex Caruso",
      text: "THE TRUE GOAT",
    },
    
  ];

  const renderCard = (card, index) => {
    return (
       
         
      <Card style={{ width: "1rem" }} key={index} className="box">
        <Card.Img variant="top" src="holder.js/50px180" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
        </Card.Body>
      </Card>
      
      
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default reactCard;