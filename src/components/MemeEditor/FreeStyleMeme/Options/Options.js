import React, { useContext } from "react";

import styles from "./index.module.css";

import { MemeTextsContext } from "../index";

import MemeTextOptions from "./MemeTextOptions";

import PaddingOption from "./PaddingOption";

export default function Options() {
  const { memeTexts } = useContext(MemeTextsContext);

  const memeText = memeTexts.filter((x) => x.focus)[0];

  return (
    <div className={styles.options}>
      <PaddingOption topOrBottom={"top"} />
      <div className={styles.memeTextsButtons}>
        <MemeTextOptions memeText={memeText} />
      </div>
      <PaddingOption topOrBottom={"bottom"} />
    </div>
  );
}
