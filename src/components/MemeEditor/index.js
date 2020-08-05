import React, { useState, useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";

import domeToImage from "dom-to-image";

import styles from "./index.module.css";

import TextImage from "./TextImage";

import FreeStyleMeme from "./FreeStyleMeme";

export default () => {
  const { memeType } = useParams();
  // freestyle === FreeStyleMeme and rest can be TextImage

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h3>Make Your Own Meme! </h3>
      </div>
      {memeType === "freestyle" && <FreeStyleMeme />}
      {memeType !== "freestyle" && <TextImage />}
    </div>
  );
};
