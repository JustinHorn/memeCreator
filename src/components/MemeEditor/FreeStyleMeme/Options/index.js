import React, { useContext, useState } from "react";

import styles from "./index.module.css";

import downloadImg from "../../downloadImg";

import { MemeTextsContext } from "../index";

export default function Options({
  meme,
  getImage,
  changeMemeTextStyle,
  removeMemeText,
}) {
  const memeTexts = useContext(MemeTextsContext);
  return (
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
          <MemeTextOptions
            key={i}
            v={v}
            i={i}
            removeMemeText={removeMemeText}
            changeMemeTextStyle={changeMemeTextStyle}
          />
        ))}
      </div>
    </div>
  );
}

const MemeTextOptions = ({ v, removeMemeText, changeMemeTextStyle, i }) => {
  const [hide, setHide] = useState(true);

  return (
    <div>
      <h5 onClick={(e) => setHide(!hide)}> {v.text}</h5>
      <div style={{ display: hide ? "none" : "block" }}>
        <button onClick={() => removeMemeText(i)}>Remove</button>
        <br className="" />
        <label htmlFor={i + "color"}>Set css color</label>
        <input
          id={i + "color"}
          value={v.style.color}
          onChange={(e) => changeMemeTextStyle(i, "color", e.target.value)}
        />
        <br className="" />
        <label htmlFor={i + "backgroundColor"}>Set css backgroundColor</label>
        <input
          id={i + "backgroundColor"}
          value={v.style.backgroundColor}
          onChange={(e) =>
            changeMemeTextStyle(i, "backgroundColor", e.target.value)
          }
        />
      </div>
    </div>
  );
};
