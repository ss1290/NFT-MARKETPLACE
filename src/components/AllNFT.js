import React from "react";
import {Link} from 'react-router-dom';
import Card from './card'

const AllNFT = ()=>{
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
  

return (
<div>
   <h1>Nft collections</h1>
   <Card  cardInfo ={cardInfo}/>
   </div>
)
  
    
};

export default AllNFT ;