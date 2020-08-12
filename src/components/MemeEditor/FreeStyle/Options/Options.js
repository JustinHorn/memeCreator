import React, { useContext } from "react";

import styles from "./index.module.css";

import { MemeTextsContext } from "../index";

import MemeTextOptions from "./MemeTextOptions";

import PaddingOption from "./PaddingOption";

export default function Options({ setMemeName, memeName, className }) {
  const { memeTexts } = useContext(MemeTextsContext);

  const memeText = memeTexts.filter((x) => x.focus)[0];

  return (
    <div className={styles.options + " " + className}>
      <label htmlFor="inp"> Meme Name: </label>
      <input
        id="inp"
        type="text"
        value={memeName}
        onChange={(e) => {
          setMemeName(e.target.value);
        }}
      />
      <PaddingOption topOrBottom={"top"} />
      <div className={styles.memeTextsButtons}>
        <MemeTextOptions memeText={memeText} />
      </div>
      <PaddingOption topOrBottom={"bottom"} />
    </div>
  );
}
