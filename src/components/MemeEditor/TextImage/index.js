import React, { useState, useEffect } from "react";

import styles from "./index.module.css";

import TextInImage from "./text_image/In";
import TextOuOfImage from "./text_image/Out";

export default ({ downloadImg, image, getImage, textIn }) => {
  const [topText, setTopText] = useState("top text");
  const [bottomText, setBottomText] = useState("bottom text");

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.meme}>
        {(textIn && (
          <TextInImage
            image={image}
            topText={topText}
            bottomText={bottomText}
          />
        )) || (
          <TextOuOfImage
            image={image}
            topText={topText}
            bottomText={bottomText}
          />
        )}
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
        <button onClick={() => downloadImg(styles.meme)}>Download Image</button>
        <input
          type="file"
          name="load image"
          accept="image/png, image/jpeg"
          onChange={getImage}
        />
      </div>
    </div>
  );
};
