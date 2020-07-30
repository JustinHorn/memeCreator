import React from "react";

import styles from "./index.module.css";

export default ({ image, topText, bottomText }) => (
  <div className={styles.meme}>
    {/* Meme goes here*/}

    <div
      className={styles.memeImage}
      style={{
        backgroundImage: "url(" + image.src + ")",
        height: image.height + "px",
        width: image.width + "px",
      }}
    >
      <div className={styles.textTop}>{topText}</div>
      <div className={styles.textBottom}>{bottomText}</div>
    </div>
  </div>
);
