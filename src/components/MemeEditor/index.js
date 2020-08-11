import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import styles from "./index.module.css";

import TextImage from "./TextImage";

import FreeStyleMeme from "./FreeStyleMeme";

import Nav from "./Nav";

import useImage, { resize } from "./useImage";

const MemeEditor = () => {
  const [image, getImage, setImage] = useImage();
  const { memeType } = useParams();
  // freestyle === FreeStyleMeme and rest can be TextImage
  const [memeImages, setMemeImages] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState();
  const [nameMeme, setNameMeme] = useState("meme");
  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
        const images = result.data.memes.map((x) => {
          const img = new Image();
          img.src = x.url;
          return resize(img);
        });

        setMemeImages(images);
      })
      .catch((error) => {
        console.log(error);
      });
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
      {memeImages[0] && (
        <DisplayImages
          meme={memeImages}
          handleMemeSelector={handleMemeSelector}
        ></DisplayImages>
      )}
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
          <FreeStyleMeme
            ref={imageNodeRef}
            image={image}
            getImage={getImage}
            setImage={setImage}
            selectedMeme={selectedMeme}
          />
        )) || (
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

const DisplayImages = ({ meme, handleMemeSelector }) => {
  console.log("Meme");

  console.log(meme[0]);
  const images = meme.map((img, i) => (
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
  ));

  return <div className={styles.egMemeContainer}> {images}</div>;
};

export default MemeEditor;
