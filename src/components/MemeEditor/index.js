import React, { useState, useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";

import domeToImage from "dom-to-image";

import styles from "./index.module.css";

import TextImage from "./TextImage";

export default () => {
  const { memeType } = useParams();
  const [image, setImage] = useState({ src: "" });

  const angryImg = "/memeCreator/images/AngrySection.jpeg";

  const resizeImg = (img) => {
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
    });
  };

  const img = new Image();
  img.src = angryImg;

  useEffect(() => {
    resizeImg(img);
  }, []);

  const getImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();

      img.src = e.target.result;
      resizeImg(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h3>Make Your Own Meme! </h3>
      </div>
      <TextImage downloadImg={downloadImg} image={image} getImage={getImage} />
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
