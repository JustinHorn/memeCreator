import React, { useState, useRef, useContext, useEffect } from "react";

import styles from "./index.module.css";

import Meme from "./Meme";

import useImage from "../useImage";

import Options from "./Options";

import calcPos, { getTotalLocation } from "./calcPos";

export const MemeTextsContext = React.createContext([]);

export default ({ selectedMeme }) => {
  const [memeTexts, setMemeTexts] = useState([]);

  const [image, getImage, setImage] = useImage(selectedMeme);

  useEffect(() => {
    if (selectedMeme) {
      setImage(selectedMeme);
    }
  }, [selectedMeme]);

  const addTextOnClick = (e) => {
    const newMemeText = getNewMemeText(e);
    setMemeTexts([
      ...memeTexts.map((v) => ({ ...v, focus: false })),
      newMemeText,
    ]);
  };

  //lol
  const getSetMemeText = (index) => {
    return (value) => {
      const arr = memeTexts.map((v) => ({ ...v, focus: false }));
      arr[index] = JSON.parse(JSON.stringify(arr[index]));
      arr[index].text = value;
      arr[index].focus = true;
      setMemeTexts([...arr]);
    };
  };

  const removeMemeText = (index) => {
    setMemeTexts([...memeTexts.slice(0, index), ...memeTexts.slice(index + 1)]);
  };

  const changeMemeTextStyle = (index, prop, value) => {
    const arr = memeTexts.map((v) => ({ ...v, focus: false }));
    arr[index] = JSON.parse(JSON.stringify(arr[index]));
    arr[index].style[prop] = value;
    setMemeTexts([...arr]);
  };

  const changeMemeTextPosition = (index, newPos) => {
    const arr = memeTexts.map((v) => ({ ...v, focus: false }));
    arr[index] = JSON.parse(JSON.stringify(arr[index]));
    arr[index].style.left = newPos.left;
    arr[index].style.top = newPos.top;
    arr[index].focus = true;

    setMemeTexts([...arr]);
  };

  const memeImageRef = useRef();

  const [offset, setOffSet] = useState({
    totalOffsetLeft: 0,
    totalOffsetTop: 0,
  });

  useEffect(() => {
    setOffSet(getTotalLocation(memeImageRef.current));
  }, [memeTexts]);

  return (
    <div className={styles.bodyContainer}>
      <MemeTextsContext.Provider value={{ memeTexts: memeTexts, offset }}>
        <Meme
          ref={memeImageRef}
          image={image}
          onImageClick={addTextOnClick}
          getSetText={getSetMemeText}
          changeMemeTextPosition={changeMemeTextPosition}
        />
        <Options
          memeImageRef={memeImageRef}
          getImage={getImage}
          removeMemeText={removeMemeText}
          changeMemeTextStyle={changeMemeTextStyle}
        />
      </MemeTextsContext.Provider>
    </div>
  );
};

const getNewMemeText = (e) => {
  const result = calcPos(e);
  const new_MemeText = {
    text: "text",
    style: {
      display: "block",
      position: "absolute",
      zIndex: "100",
      color: "white",
      cols: "4",
      fontSize: 30,
      resize: "none",
      borderColor: "transparent",
      backgroundColor: "transparent",
      transform: "",
      left: result.left,
      top: result.top,
    },
    focus: true,
  };

  return new_MemeText;
};
