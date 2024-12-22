import React from "react";
import styles from "./Card.module.css";
import Chip from '@mui/material/Chip';

function Card({ image, follows, name }) {
  return (
    <div className={styles.card}>
    <div className={styles.image}>
      <img className={styles.imageInside} src={image} alt="img" />
      <Chip label={`${follows} Follows`} style={{color:"white",backgroundColor:"#121212"}}/>
    </div>
    <p className={styles.name}>{name}</p>
  </div>
  );
}

export default Card;
