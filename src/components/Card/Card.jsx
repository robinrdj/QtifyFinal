import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

function Card({ image, follows, name, isSong, likes }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img className={styles.imageInside} src={image} alt="img" />
        {isSong ? (
          <Chip
            label={`${likes} likes`}
            style={{ color: "white", backgroundColor: "#121212" }}
          />
        ) : (
          <Chip
            label={`${follows} Follows`}
            style={{ color: "white", backgroundColor: "#121212" }}
          />
        )}
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  );
}

export default Card;
