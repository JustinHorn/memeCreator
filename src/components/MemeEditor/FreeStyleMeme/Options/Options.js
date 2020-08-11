import React, { useContext } from "react";

import styles from "./index.module.css";

import downloadImg from "../../downloadImg";

import { MemeTextsContext } from "../index";

import MemeTextOptions from "./MemeTextOptions";

export default function Options() {
  const { memeTexts } = useContext(MemeTextsContext);

  const memeText = memeTexts.filter((x) => x.focus)[0];

  return (
    <div className={styles.options}>
      <div className={styles.memeTextsButtons}>
        <MemeTextOptions memeText={memeText} />
      </div>
    </div>
  );
}
