import React from "react";
import styles from "./Button.module.css";

function Button({content}) {
  return <div className={styles.button}>
    {content}
    </div>;
}

export default Button;
