import React, { useState } from "react";

import { useParams } from "react-router-dom";

import domtoimage from "dom-to-image";

import styles from "./index.module.css";

import anrgyImg from "../../images/AngrySection.jpeg";

export default () => {
  let { memetype } = useParams();

  const [topText, setTopText] = useState("top text");
  const [bottomText, setBottomText] = useState("bottom text");
  const [image, setImage] = useState(anrgyImg);

  setTimeout(() => {
    const node = document.querySelector("." + styles.meme);

    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        const img = document.querySelector("." + styles.resultImage);
        img.src = dataUrl;
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }, 1000);

  const download = () => {
    var link = document.createElement("a");
    link.download = "meme.jpeg";
    link.href = document.querySelector("." + styles.resultImage).src;
    console.log(link.href);
    link.click();
  };

  return (
    <div>
      <div className={styles.editor}>
        {" "}
        <div className={styles.header}>
          <h3>This is the MemeEditor </h3>
          <div>
            page with memetype:
            <i> {memetype} </i>
          </div>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.meme}>
            {/* Meme goes here*/}
            <div>{topText}</div>
            <div
              className={styles.memeImage}
              style={{ backgroundImage: "url(" + image + ")" }}
            ></div>
            <div className={styles.textBottom}>{bottomText}</div>
          </div>
          <div className={styles.options}>
            <input
              type="text"
              value={topText}
              onChange={(e) => {
                setTopText(e.target.value);
              }}
            />
            <input
              type="text"
              value={bottomText}
              onChange={(e) => {
                setBottomText(e.target.value);
              }}
            />
            <button onClick={download}> Download Image</button>
            <input
              type="file"
              name="load image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setImage(e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);

                console.log(e.target.files[0]);
                //  setImage(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <img
          src=""
          className={styles.resultImage}
          alt="this will be the result"
        />
      </div>
    </div>
  );
};
