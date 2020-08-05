import React, { useState, useRef, useContext, useEffect } from "react";

import styles from "./index.module.css";

import Meme from "./Meme";

import useImage from "../useImage";

import Options from "./Options";

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
      arr[index] = { ...memeTexts[index], text: value };
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

    setMemeTexts([...arr]);
  };

  const memeImageRef = useRef();

  return (
    <div className={styles.bodyContainer}>
      <MemeTextsContext.Provider value={memeTexts}>
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
  const new_MemeText = {
    text: "text",
    style: {
      display: "block",
      position: "absolute",
      zIndex: "100",
      color: "white",
      width: "4ch",
      borderColor: "transparent",
      backgroundColor: "transparent",
      ...calcPos(e),
    },
    focus: true,
  };

  new_MemeText.style.color = "green";
  return new_MemeText;
};

const calcPos = (e) => {
  const x = e.clientX - e.target.parentNode.offsetLeft;
  const y = e.clientY - e.target.parentNode.offsetTop;
  const left = x + "px";
  const top = y + "px";
  return { left, top };
};
