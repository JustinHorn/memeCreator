import React, { useState, useEffect } from "react";

import styles from "./index.module.css";

import downloadImg from "../downloadImg";

import useImage from "../useImage";

import FontButtons from "./FontButtons";

import ColorPicker from "./ColorPicker";

export default ({ selectedMeme }) => {
  const [topText, setTopText] = useState({ text: "top text", inner: true });
  const [bottomText, setBottomText] = useState({
    text: "bottom text",
    inner: true,
  });

  const [image, getImage, setImage] = useImage();

  useEffect(() => {
    if (selectedMeme) {
      setImage(selectedMeme);
    }
  }, [selectedMeme]);

  const [fontText, setFontText] = useState("");

  const [fontSize, setFontSize] = useState(12);

  const [textColor, setTextColor] = useState("black");

  const getInnerStyle = (text, font, SizeOfFont) => {
    return {
      display: text.inner ? "block" : "none",
      color: textColor,
      fontFamily: font,
      fontSize: SizeOfFont,
    };
  };
  // Function that create the top text section
  const getOuterStyle = (text, font, SizeOfFont) => {
    return {
      display: !text.inner ? "block" : "none",
      color: textColor,
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
        <div
          style={getOuterStyle(topText, fontText, fontSize)}
          className={styles.textTop}
        >
          {topText.text}
        </div>

        <MemeImage image={image} onClick={() => {}}>
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
        </MemeImage>
        <div
          style={getOuterStyle(bottomText, fontText, fontSize)}
          className={styles.textBottom}
        >
          {bottomText.text}
        </div>
      </div>
      <div className={styles.options}>
        {/* Text Input. Top and Bottom */}
        <label htmlFor="inp" className={styles.inp}>
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
        <label htmlFor="inp2" className={styles.inp}>
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
          Top in/out
        </button>

        {/* Button to Change Bottom text position */}
        <button
          className={styles.Button}
          onClick={() =>
            setBottomText({ ...bottomText, inner: !bottomText.inner })
          }
        >
          bottom in/out
        </button>

        <button
          className={styles.Button}
          onClick={() => {
            const node = document.querySelector("." + styles.memeImage);

            downloadImg(node);
          }}
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

        <FontButtons
          setFont={setFontText}
          setSize={setFontSize}
          letterSize={fontSize}
        ></FontButtons>

        <ColorPicker setColor={setTextColor} currentColor={textColor} />
      </div>
    </div>
  );
};

const MemeImage = ({ image, children }) => {
  return (
    <div
      className={styles.memeImage}
      style={{
        backgroundImage: "url(" + image.src + ")",
        height: image.height + "px",
        width: image.width + "px",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      {children}
    </div>
  );
};
