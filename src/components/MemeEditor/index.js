import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import domeToImage from "dom-to-image";

import styles from "./index.module.css";

import TextOutOfImage from "./textOutImage";
import TextInImage from "./textInImage";

export default () => {
  const { memeType } = useParams();
  // textInOfImage or textOutOfImage
  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <h3>This is the MemeEditor </h3>
      </div>
      {(memeType === "textInOfImage" && <TextInImage></TextInImage>) || (
        <TextOutOfImage></TextOutOfImage>
      )}
    </div>
  );
};
