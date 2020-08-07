import React, { useContext } from "react";

import styles from "./index.module.css";

import downloadImg from "../../downloadImg";

import { MemeTextsContext } from "../index";

import MemeTextOptions from "./MemeTextOptions";

export default function Options({ memeImageRef, getImage }) {
  const { memeTexts } = useContext(MemeTextsContext);
  return (
    <div className={styles.options}>
      <button
        className="download"
        onClick={(e) => downloadImg(memeImageRef.current)}
      >
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
        {memeTexts
          .filter((x) => x.focus)
          .map((memeText, i) => (
            <MemeTextOptions key={i} memeText={memeText} />
          ))}
      </div>
    </div>
  );
}
