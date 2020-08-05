import React, { useState, useRef } from "react";

import styles from "./index.module.css";

import Meme from "./Meme";

import downloadImg from "../downloadImg";

import useImage from "../useImage";

export default () => {
  const [memeTexts, setMemeTexts] = useState([]);

  const [image, getImage] = useImage();

  const onMemeClick = (e) => {
    const newMemeText = getNewMemeText(e);

    setMemeTexts([
      ...memeTexts.map((v) => ({ ...v, focus: false })),
      newMemeText,
    ]);
  };

  const getSetText = (index) => {
    return (value) => {
      const arr = memeTexts.map((v) => ({ ...v, focus: false }));
      arr[index] = { ...memeTexts[index], text: value };
      arr[index].focus = true;
      setMemeTexts([...arr]);
    };
  };

  const meme = useRef();

  return (
    <div className={styles.bodyContainer}>
      <Meme
        ref={meme}
        image={image}
        memeTexts={memeTexts}
        onClick={onMemeClick}
        getSetText={getSetText}
      ></Meme>
      <div className={styles.options}>
        <button className="download" onClick={(e) => downloadImg(meme.current)}>
          Download Image
        </button>
        <input
          id="files"
          type="file"
          name="load image"
          accept="image/png, image/jpeg"
          onChange={getImage}
        />
        <div className={styles.memeTextsButtons}>
          {memeTexts.map((v, i) => (
            <button
              key={i}
              onClick={(e) => {
                setMemeTexts([
                  ...memeTexts.slice(0, i),
                  ...memeTexts.slice(i + 1),
                ]);
              }}
            >
              Remove {v.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const getNewMemeText = (e) => {
  const x = e.clientX - e.target.parentNode.offsetLeft;
  const y = e.clientY - e.target.parentNode.offsetTop;
  const left = x + "px";
  const top = y + "px";

  const new_MemeText = {
    text: "text",
    style: {
      display: "block",
      position: "absolute",
      zIndex: "100",
      color: "red",
      width: "4ch",
      backgroundColor: "blue",
      left,
      top,
    },
    focus: true,
  };
  return new_MemeText;
};
