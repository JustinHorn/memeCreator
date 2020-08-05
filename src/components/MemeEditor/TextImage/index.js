import React, { useState } from "react";

import styles from "./index.module.css";

export default ({ downloadImg, image, getImage }) => {
  const [topText, setTopText] = useState({ text: "top text", inner: true });
  const [bottomText, setBottomText] = useState({
    text: "bottom text",
    inner: true,
  });

  const [fontText, setFontText] = useState("");

  const [fontSize, setFontSize] = useState(12);

  const getInnerStyle = (text, font, SizeOfFont) => {
    return {
      display: text.inner ? "block" : "none",
      color: text.inner ? "white" : "black",
      fontFamily: font,
      fontSize: SizeOfFont,
    };
  };
  // Funtion that create the top text section
  const getOuterStyle = (text, font, SizeOfFont) => {
    return {
      display: !text.inner ? "block" : "none",
      color: text.inner ? "white" : "black",
      backgroundColor: text.inner ? "transparent" : "white",
      fontFamily: font,
      fontSize: SizeOfFont,
    };
  };

  return (
    <div className={styles.bodyContainer}>
      <div
        className={styles.memeContainer}
        style={{
          height: image.height + "px",
          width: image.width + "px",
        }}
      >
        {/* Outside Top text */}
        <div
          style={getOuterStyle(topText, fontText, fontSize)}
          className={styles.textTop}
        >
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
          {/* Inside Top text */}
          <div
            style={getInnerStyle(topText, fontText, fontSize)}
            className={styles.textTop}
          >
            {topText.text}
          </div>

          {/* This span prevents that the bottom text to go up when the top text is outside of the image */}
          <span></span>

          {/* Inside Bottom text */}
          <div
            style={getInnerStyle(bottomText, fontText, fontSize)}
            className={styles.textBottom}
          >
            {bottomText.text}
          </div>
        </div>

        {/*Image end*/}

        {/* Outside Bottom text */}
        <div
          style={getOuterStyle(bottomText, fontText, fontSize)}
          className={styles.textBottom}
        >
          {bottomText.text}
        </div>
      </div>
      <div className={styles.options}>
        {/* Text Input. Top and Bottom */}
        <label for="inp" className={styles.inp}>
          <input
            id="inp"
            type="text"
            value={topText.text}
            onChange={(e) => {
              setTopText({ ...topText, text: e.target.value });
            }}
          />
          <span className={styles.label}>Top Text</span>
          <span className={styles.focusBg}></span>
        </label>
        <label for="inp2" className={styles.inp}>
          <input
            id="inp2"
            type="text"
            value={bottomText.text}
            onChange={(e) => {
              setBottomText({ ...bottomText, text: e.target.value });
            }}
          />
          <span className={styles.label}>Bottom Text</span>
          <span className={styles.focusBg}></span>
        </label>

        {/* Button to Change Top text position */}
        <button
          className={styles.Button}
          onClick={() => setTopText({ ...topText, inner: !topText.inner })}
        >
          toggle topText in and out
        </button>

        {/* Button to Change Bottom text position */}
        <button
          className={styles.Button}
          onClick={() =>
            setBottomText({ ...bottomText, inner: !bottomText.inner })
          }
        >
          toggle bottom text in and out
        </button>

        <button
          className={styles.Button}
          onClick={() => downloadImg(styles.meme)}
        >
          Download Image
        </button>
        <label htmlFor="files" className={styles.Button}>
          Upload an Image
        </label>
        <input
          id="files"
          type="file"
          name="load image"
          accept="image/png, image/jpeg"
          onChange={getImage}
          style={{ visibility: "hidden" }}
        />

        <div className={styles.styleOptions}>
          {/* Buttons for the Font family */}
          <div className={styles.fontButtonContainer}>
            <button
              className={styles.Button}
              onClick={() => setFontText("Georgia, serif")}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 15 + "px",
              }}
            >
              Georgia
            </button>
            <button
              className={styles.Button}
              onClick={() => setFontText("Arial Black")}
              style={{ fontFamily: "Arial Black", fontSize: 13 + "px" }}
            >
              Arial Black
            </button>
            <button
              className={styles.Button}
              onClick={() => setFontText("monospace")}
              style={{ fontFamily: "monospace" }}
            >
              Monospace
            </button>
            <button
              className={styles.Button}
              onClick={() => setFontText("Comic Sans MS")}
              style={{ fontFamily: "Comic Sans MS" }}
            >
              Comic Sans
            </button>
            <button
              className={styles.Button}
              onClick={() => setFontText("cursive")}
              style={{ fontFamily: "cursive" }}
            >
              Cursive
            </button>
          </div>

          {/* Buttons for the size */}
          <div className={styles.sizeButtons}>
            <button
              className={styles.Button}
              onClick={() => setFontSize(fontSize + 1)}
              style={{ fontSize: "15px" }}
            >
              A+
            </button>
            <button
              className={styles.Button}
              onClick={() => setFontSize(fontSize - 1)}
              style={{ fontSize: "10px" }}
            >
              A-
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
