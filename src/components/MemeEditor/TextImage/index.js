import React, { useState, useEffect } from "react";

import styles from "./index.module.css";

export default ({ downloadImg, image, getImage }) => {
  const [topText, setTopText] = useState({ text: "top text", inner: true });
  const [bottomText, setBottomText] = useState({
    text: "bottom text",
    inner: true,
  });

  const getInnerStyle = (text) => {
    return {
      display: text.inner ? "block" : "none",
      color: text.inner ? "white" : "black",
    };
  };

  const getOuterStyle = (text) => {
    return {
      display: !text.inner ? "block" : "none",
      color: text.inner ? "white" : "black",
    };
  };

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.meme}>
        <div style={getOuterStyle(topText)} className={styles.textTop}>
          {topText.text}
        </div>
        {/*Image beginn*/}

        <div
          className={styles.memeImage}
          style={{
            backgroundImage: "url(" + image.src + ")",
            height: image.height + "px",
            width: image.width + "px",
          }}
        >
          <div style={getInnerStyle(topText)} className={styles.textTop}>
            {topText.text}
          </div>
          <span></span>
          <div style={getInnerStyle(bottomText)} className={styles.textBottom}>
            {bottomText.text}
          </div>
        </div>
        {/*Image end*/}
        <div style={getOuterStyle(bottomText)} className={styles.textBottom}>
          {bottomText.text}
        </div>
      </div>
      <div className={styles.options}>
        <input
          type="text"
          value={topText.text}
          onChange={(e) => {
            setTopText({ ...topText, text: e.target.value });
          }}
        />
        <input
          type="text"
          value={bottomText.text}
          onChange={(e) => {
            setBottomText({ ...bottomText, text: e.target.value });
          }}
        />

        <button
          onClick={() => setTopText({ ...topText, inner: !topText.inner })}
        >
          toggle topText in and out
        </button>
        <button
          onClick={() =>
            setBottomText({ ...bottomText, inner: !bottomText.inner })
          }
        >
          toggle bottom text in and out
        </button>

        <button onClick={() => downloadImg(styles.meme)}>Download Image</button>
        <input
          type="file"
          name="load image"
          accept="image/png, image/jpeg"
          onChange={getImage}
        />
      </div>
    </div>
  );
};
