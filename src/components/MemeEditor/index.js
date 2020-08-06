import React, { useState, useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";

import domeToImage from "dom-to-image";

import styles from "./index.module.css";

import TextImage from "./TextImage";

import FreeStyleMeme from "./FreeStyleMeme";
const nums = Math.floor(Math.random() * 100);

export default () => {
  const { memeType } = useParams();
  // freestyle === FreeStyleMeme and rest can be TextImage
  const [meme, setMeme] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState();
  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMeme(
          result.data.memes.map((x) => {
            const img = new Image();
            img.src = x.url;
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

            return img;
          })
        ); // <-- this is an array of urls
      })
      .catch((error) => {});
  }, []);
  const handleMemeSelector = (e) => {
    setSelectedMeme({
      src: e.target.src,
      height: e.target.height * 5,
      width: e.target.width * 5,
    });
  };
  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h3>Make Your Own Meme! </h3>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.egMemeContainer}>
          {meme.slice(nums, nums + 6).map((img, i) => (
            <img
              key={i}
              className={styles.imgMeme}
              onClick={handleMemeSelector}
              src={img.src}
              style={{
                width: img.width * 0.2 + "px",
                height: img.height * 0.2 + "px",
              }}
              alt="img"
            ></img>
          ))}
        </div>
        <div>
          {memeType === "freestyle" && (
            <FreeStyleMeme selectedMeme={selectedMeme} />
          )}
          {memeType !== "freestyle" && (
            <TextImage selectedMeme={selectedMeme} />
          )}
        </div>
      </div>
    </div>
  );
};
