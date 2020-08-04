import React, { useState, useRef } from "react";

import styles from "./index.module.css";

import Meme from "./Meme";

export default ({ downloadImg, image, getImage }) => {
  const [textStyles, setTextStyles] = useState([]);

  const onMemeClick = (e) => {
    const x = e.clientX - e.target.parentNode.offsetLeft;
    const y = e.clientY - e.target.parentNode.offsetTop;
    const left = x + "px";
    const top = y + "px";

    const new_textStyles = {
      text: "text",
      style: {
        display: "block",
        position: "absolute",
        zIndex: "100",
        color: "red",
        width: "4ch",
        backgroundColor: "blue",
        left,
        top,
      },
      focus: true,
    };

    setTextStyles([
      ...textStyles.map((v) => ({ ...v, focus: false })),
      new_textStyles,
    ]);
  };

  const meme = useRef();

  return (
    <div className={styles.bodyContainer}>
      <h1>EDITOR 2</h1>

      <Meme
        ref={meme}
        styles={styles}
        image={image}
        textStyles={textStyles}
        onClick={onMemeClick}
        setTextStyles={setTextStyles}
      ></Meme>
      <div className={styles.options}>
        <button className="download" onClick={(e) => downloadImg(meme.current)}>
          Download Image
        </button>
        <input
          id="files"
          type="file"
          name="load image"
          accept="image/png, image/jpeg"
          onChange={getImage}
        />
        <div className={styles.memeTexts}>
          {textStyles.map((v, i) => (
            <button
              key={i}
              onClick={(e) => {
                setTextStyles([
                  ...textStyles.slice(0, i),
                  ...textStyles.slice(i + 1),
                ]);
              }}
            >
              Remove {v.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
