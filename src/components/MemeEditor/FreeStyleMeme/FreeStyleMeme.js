import React, { useState, useRef, useEffect } from "react";

import useMemeTextsReducer from "./MemeTextState";

import styles from "./index.module.css";

import Meme from "./Meme";

import useImage from "../useImage";

import Options from "./Options";

import { getTotalLocation } from "./calcPos";

export const MemeTextsContext = React.createContext([]);

export default React.forwardRef(
  ({ selectedMeme, image, getImage, setImage }, imageNodeRef) => {
    const [memeTexts, reduceMemeTexts] = useMemeTextsReducer();

    const [offset, setOffSet] = useState({
      totalOffsetLeft: 0,
      totalOffsetTop: 0,
    });

    useEffect(() => {
      if (imageNodeRef.current) {
        setOffSet(getTotalLocation(imageNodeRef.current));
      }
    }, [memeTexts]);

    return (
      <div className={styles.bodyContainer}>
        <MemeTextsContext.Provider
          value={{ memeTexts: memeTexts, reduceMemeTexts, offset }}
        >
          <Meme ref={imageNodeRef} image={image} />
          <Options memeImageRef={imageNodeRef} getImage={getImage} />
        </MemeTextsContext.Provider>
      </div>
    );
  }
);
