import React, { useState, useRef, useEffect, useReducer } from "react";

import useMemeTextsReducer from "./MemeTextState";

import styles from "./index.module.css";

import Meme from "./Meme";

import useImage from "../useImage";

import Options from "./Options";

import { getTotalLocation } from "./calcPos";

export const MemeTextsContext = React.createContext([]);

export default ({ selectedMeme }) => {
  const [memeTexts, reduceMemeTexts] = useMemeTextsReducer();

  const [image, getImage, setImage] = useImage(selectedMeme);

  useEffect(() => {
    if (selectedMeme) {
      setImage(selectedMeme);
    }
  }, [selectedMeme]);

  const memeImageRef = useRef();

  const [offset, setOffSet] = useState({
    totalOffsetLeft: 0,
    totalOffsetTop: 0,
  });

  useEffect(() => {
    if (memeImageRef.current) {
      setOffSet(getTotalLocation(memeImageRef.current));
    }
  }, [memeTexts]);

  return (
    <div className={styles.bodyContainer}>
      <MemeTextsContext.Provider
        value={{ memeTexts: memeTexts, reduceMemeTexts, offset }}
      >
        <Meme ref={memeImageRef} image={image} />
        <Options memeImageRef={memeImageRef} getImage={getImage} />
      </MemeTextsContext.Provider>
    </div>
  );
};
