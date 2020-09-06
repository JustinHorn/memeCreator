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

  const [memeName, setMemeName] = useState("meme");

  const handleMemeSelector = (e) => {
    resizeImg({
      src: e.target.src,
      height: e.target.height * 100,
      width: e.target.width * 100,
    });
  };
  const imageNodeRef = useRef();

  document.title = "Make Your Own Meme!";

  return (
    <div className={styles.editor}>
      <Nav
        className={styles.nav}
        imageNodeRef={imageNodeRef}
        getImage={getImage}
        memeName={memeName}
      />

      <DisplayImages handleMemeSelector={handleMemeSelector} />
      <div className={styles.bodyContainer}>
        {(memeType === "freestyle" && (
          <FreeStyle
            ref={imageNodeRef}
            setMemeName={setMemeName}
            memeName={memeName}
            image={image}
          />
        )) || (
          <TextImage
            ref={imageNodeRef}
            setMemeName={setMemeName}
            memeName={memeName}
            image={image}
          />
        )}
      </div>
    </div>
  );
};

const DisplayImages = ({ handleMemeSelector }) => {
  const [memeImages, setMemeImages] = useState([]);

  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => {
          const images = result.data.memes.map((x) => {
            const img = new Image();
            img.src = x.url;
            return resize(img, 100);
          });

          setMemeImages(images);
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const images = memeImages.map((img, i) => {
    img.width = 50;
    img.height = 50;

    return (
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
    );
  });

  return (
    <div className={styles.egMemeContainer}>
      <div className={styles.egMemeContainerChild}> {images}</div>
    </div>
  );
};

export default MemeEditor;
