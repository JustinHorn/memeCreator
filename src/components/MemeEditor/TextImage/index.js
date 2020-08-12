import React, { useState, useEffect } from "react";

import styles from "./index.module.css";

// import downloadImg from "../downloadImg";

import FontButtons from "./FontButtons";

import ColorPicker from "./ColorPicker";

export default React.forwardRef(
  ({ image, memeName, setMemeName }, imageNodeRef) => {
    const [topText, setTopText] = useState({ text: "top text", inner: true });
    const [bottomText, setBottomText] = useState({
      text: "bottom text",
      inner: true,
    });

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
          ref={imageNodeRef}
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
          <label htmlFor="inp3" className={styles.inp}>
            <input
              id="inp3"
              type="text"
              value={memeName}
              onChange={(e) => {
                setMemeName(e.target.value);
              }}
            />
            <span className={styles.label}>Meme Name</span>
            <span className={styles.focusBg}></span>
          </label>
        </div>

        <div className={styles.fontStyleContainer}>
          <FontButtons
            setFont={setFontText}
            setSize={setFontSize}
            letterSize={fontSize}
          ></FontButtons>
          <ColorPicker setColor={setTextColor} currentColor={textColor} />
        </div>
      </div>
    );
  }
);

const MemeImage = React.forwardRef(({ image, children }, imageNodeRef) => {
  return (
    <div
      ref={imageNodeRef}
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
});
