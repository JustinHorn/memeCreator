import React, { useContext } from "react";

import styles from "./memeOptions.module.css";

import { MemeTextsContext } from "../index";

export default ({ memeText }) => {
  const { reduceMemeTexts } = useContext(MemeTextsContext);

  const headline = (memeText && memeText.text) || "no text selected";
  const removeMemeText =
    memeText &&
    (() => reduceMemeTexts({ type: "removeText", id: memeText.id }));

  const onPropChange =
    (memeText &&
      ((propName) => (e) =>
        reduceMemeTexts({
          type: "changeTextStyle",
          id: memeText.id,
          prop: propName,
          value: e.target.value,
        }))) ||
    (() => {});
  return (
    <div className={memeText ? "" : styles.opacity}>
      <div>
        <h5 className={styles.headline}>
          {headline}
          <img
            className={styles.removeButton}
            src="/memeCreator/src/icon/remove.png"
            onClick={removeMemeText}
            alt="remove"
          />
        </h5>
      </div>
      <div>
        Set css:
        {[
          "color",
          "backgroundColor",
          "fontSize",
          "transform",
          "textTransform",
          "fontFamily",
        ].map((propName, i) => (
          <div key={i} className={styles.cssOption}>
            <label htmlFor={i + "propName"}> {propName}</label>
            <br />
            <input
              id={i + "propName"}
              className={styles.cssOptionInput}
              value={memeText && memeText.style[propName]}
              onChange={onPropChange(propName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
