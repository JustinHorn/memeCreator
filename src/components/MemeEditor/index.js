import React from "react";

import { useParams } from "react-router-dom";

import domtoimage from "dom-to-image";

import styles from "./index.module.css";

import anrgyImg from "../../images/AngrySection.jpeg";

export default () => {
  let { memetype } = useParams();

  setTimeout(() => {
    const node = document.querySelector("." + styles.meme);

    console.log(node);

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
            <div>meme text top</div>
            <div
              className={styles.memeImage}
              style={{ backgroundImage: "url(" + anrgyImg + ")" }}
            >
              Image
            </div>
            <div className={styles.textBottom}>meme text bottom</div>
          </div>
          <div className={styles.options}>
            <input type="text" value="Option 1" />
            <input type="text" value="Option 2" />
            <input type="text" value="Option 3" />
          </div>
        </div>
      </div>
      <img
        src=""
        className={styles.resultImage}
        alt="this will be the result"
      />
    </div>
  );
};
