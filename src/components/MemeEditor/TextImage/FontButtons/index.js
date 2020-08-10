import React from "react";

import styles from "./index.module.css";

const FontButtons = (props) => {
  return (
    <div className={styles.styleOptions}>
      {/* Buttons for the Font family */}
      <div className={styles.fontButtonContainer}>
        <button
          className={styles.Button}
          onClick={() => props.setFont("Georgia, serif")}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 15 + "px",
          }}
        >
          Georgia
        </button>
        <button
          className={styles.Button}
          onClick={() => props.setFont("Arial Black")}
          style={{ fontFamily: "Arial Black", fontSize: 13 + "px" }}
        >
          Arial Black
        </button>
        <button
          className={styles.Button}
          onClick={() => props.setFont("monospace")}
          style={{ fontFamily: "monospace" }}
        >
          Monospace
        </button>
        <button
          className={styles.Button}
          onClick={() => props.setFont("Comic Sans MS")}
          style={{ fontFamily: "Comic Sans MS" }}
        >
          Comic Sans
        </button>
        <button
          className={styles.Button}
          onClick={() => props.setFont("cursive")}
          style={{ fontFamily: "cursive" }}
        >
          Cursive
        </button>
        {/* Buttons for the size */}
        <div className={styles.sizeButtons}>
          <button
            className={styles.Button}
            onClick={() => props.setSize(props.letterSize + 1)}
            style={{ fontSize: "15px", height: "35px" }}
          >
            A+
          </button>
          <button
            className={styles.Button}
            onClick={() => props.setSize(props.letterSize - 1)}
            style={{ fontSize: "10px", height: "35px" }}
          >
            A-
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontButtons;
