import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import styles from "./index.module.css";

import TextImage from "./TextImage";

import FreeStyleMeme from "./FreeStyleMeme";

import Nav from "./Nav";

import useImage from "./useImage";

const nums = Math.floor(Math.random() * 100);

export default () => {
  const [image, getImage, setImage] = useImage();
  const { memeType } = useParams();
  // freestyle === FreeStyleMeme and rest can be TextImage
  const [meme, setMeme] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState();
  const [nameMeme, setNameMeme] = useState("meme");
  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
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

  useEffect(() => {
    if (selectedMeme) {
      setImage(selectedMeme);
    }
  }, [selectedMeme]);

  const imageNodeRef = useRef();

  return (
    <div className={styles.editor}>
      <Nav
        className={styles.nav}
        imageNodeRef={imageNodeRef}
        getImage={getImage}
        memeName={nameMeme}
      ></Nav>
      <div className={styles.header}>
        <h3>Make Your Own Meme! </h3>
      </div>
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

      <div className={styles.bodyContainer}>
        <label htmlFor="inp"> Meme Name: </label>
        <input
          id="inp"
          type="text"
          value={nameMeme}
          onChange={(e) => {
            setNameMeme(e.target.value);
          }}
        />
        {memeType === "freestyle" && (
          <FreeStyleMeme
            ref={imageNodeRef}
            image={image}
            getImage={getImage}
            setImage={setImage}
            selectedMeme={selectedMeme}
          />
        )}
        {memeType !== "freestyle" && (
          <TextImage
            ref={imageNodeRef}
            image={image}
            getImage={getImage}
            setImage={setImage}
            selectedMeme={selectedMeme}
          />
        )}
      </div>
    </div>
  );
};
