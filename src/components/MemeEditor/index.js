import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import styles from "./index.module.css";

import TextImage from "./TextImage";

import FreeStyle from "./FreeStyle";

import Nav from "./Nav";

import useImage, { resize } from "./useImage";

const MemeEditor = () => {
  const { image, getImage, resizeImg } = useImage();
  const { memeType } = useParams();

  const [nameMeme, setNameMeme] = useState("meme");

  const handleMemeSelector = (e) => {
    resizeImg({
      src: e.target.src,
      height: e.target.height * 100,
      width: e.target.width * 100,
    });
  };
  const imageNodeRef = useRef();

  return (
    <div className={styles.editor}>
      <Nav
        className={styles.nav}
        imageNodeRef={imageNodeRef}
        getImage={getImage}
        memeName={nameMeme}
      />

      <div className={styles.header}>
        <h3>Make Your Own Meme! </h3>
      </div>
      <DisplayImages handleMemeSelector={handleMemeSelector} />
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
        {(memeType === "freestyle" && (
          <FreeStyle ref={imageNodeRef} image={image} />
        )) || <TextImage ref={imageNodeRef} image={image} />}
      </div>
    </div>
  );
};

const DisplayImages = ({ meme, handleMemeSelector }) => {
  const [memeImages, setMemeImages] = useState([]);

  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => {
          const images = result.data.memes.map((x) => {
            const img = new Image();
            img.src = x.url;
            console.log(x.url);
            return resize(img, 100);
          });

          setMemeImages(images);
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const images = memeImages.map((img, i) => (
    <img
      key={i}
      className={styles.imgMeme}
      onClick={handleMemeSelector}
      src={img.src}
      style={{
        width: img.width + "px",
        height: img.height + "px",
      }}
      alt="img"
    />
  ));

  memeImages.forEach((img) => console.log(img.height));

  return <div className={styles.egMemeContainer}> {images}</div>;
};

export default MemeEditor;
