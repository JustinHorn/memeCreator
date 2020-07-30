import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import domeToImage from "dom-to-image";

import styles from "./index.module.css";

import anrgyImg from "../../../images/AngrySection.jpeg";

export default () => {
  const [topText, setTopText] = useState("top text");
  const [bottomText, setBottomText] = useState("bottom text");
  const img = new Image();
  img.src = anrgyImg;
  const [image, setImage] = useState(img);

  const getImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();

      img.src = e.target.result;
      setTimeout(() => {
        const MAX_SIZE = 500;
        if (img.height > MAX_SIZE || img.width > MAX_SIZE) {
          const ratio = img.height / img.width;

          if (img.height > img.width) {
            img.height = MAX_SIZE;
            img.width = MAX_SIZE / ratio;
          } else {
            img.width = MAX_SIZE;
            img.height = MAX_SIZE * ratio;
          }
        }
        setTimeout(() => {
          setImage(img);
        }, 0);
      }, 0);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h3>This is the MemeEditor </h3>
      </div>
      <div className={styles.bodyContainer}>
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
          <button onClick={() => downloadImg(styles.meme)}>
            Download Image
          </button>
          <input
            type="file"
            name="load image"
            accept="image/png, image/jpeg"
            onChange={getImage}
          />
        </div>
      </div>
    </div>
  );
};

function downloadImg(className) {
  const node = document.querySelector("." + className);
  domeToImage
    .toPng(node)
    .then(function (dataUrl) {
      downloadMeme(dataUrl);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function downloadMeme(dataUrl) {
  var link = document.createElement("a");
  link.download = "meme.jpg";
  link.href = dataUrl;
  link.click();
}
