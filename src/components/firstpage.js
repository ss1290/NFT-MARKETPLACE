import * as React from 'react';
import Card from '@mui/material/Card';
import "./firstpage.css";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import { makeStyles } from '@mui/styles';

const firstpage = () => {
    return (
        <>
          <section className='hero-section'>
            <p>NFT LISTS:-</p>
          </section>  
          <section className='nft-section'>
          <div className='nft-container'>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          height="140"
          image="../crytopic/k1.png"
          alt="k1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          K1 cryto
          </Typography>
          <Typography variant="body2" color="text.secondary">
            It is Top listed 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> 
    </div>
    </section> 
        </>
    )
}

export default firstpage
