import React, { useContext } from "react";

import { MemeTextsContext } from "../index";

import styles from "./index.module.css";

import MemeText from "./MemeText";
import MemeImage from "./MemeImage";

export default React.forwardRef(({ onImageClick, image }, ref) => {
  const { memeTexts, space } = useContext(MemeTextsContext);

  const MemeTexts = memeTexts.map((element, i) => (
    <MemeText key={i} element={element} />
  ));

  const padTop = {
    paddingTop: space.top + "px",
    backgroundColor: space.topColor,
  };
  const padBottom = {
    paddingBottom: space.bottom + "px",
    backgroundColor: space.bottomColor,
  };

  return (
    <div ref={ref} className={styles.meme} onClick={onImageClick}>
      <div style={padTop}></div>
      <MemeImage image={image}>{MemeTexts}</MemeImage>
      <div style={padBottom}></div>
    </div>
  );
});

/*Forward ref makes it possible to forward the ref to the component*/
