import React, { useContext } from "react";

import styles from "./index.module.css";

import downloadImg from "../../downloadImg";

import { MemeTextsContext } from "../index";

import MemeTextOptions from "./MemeTextOptions";

export default function Options({ memeImageRef, getImage }) {
  const { memeTexts } = useContext(MemeTextsContext);
  return (
    <div className={styles.options}>
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
