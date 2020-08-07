import React, { useContext } from "react";

import styles from "./index.module.css";

import { MemeTextsContext } from "../../index";

export default ({ memeText }) => {
  const { reduceMemeTexts } = useContext(MemeTextsContext);
  return (
    <>
      <div>
        <h5 className={styles.headline}>
          {memeText.text}
          <img
            className={styles.removeButton}
            src="/memeCreator/src/icon/remove.png"
            onClick={() =>
              reduceMemeTexts({ type: "removeText", id: memeText.id })
            }
            alt="remove"
          />
        </h5>
      </div>
      <div>
        {[
          "color",
          "backgroundColor",
          "fontSize",
          "transform",
          "textTransform",
        ].map((propName, i) => (
          <div key={i}>
            <label htmlFor={i + "propName"}>Set css {propName}</label>
            <br />
            <input
              id={i + "propName"}
              value={memeText.style[propName]}
              onChange={(e) =>
                reduceMemeTexts({
                  type: "changeTextStyle",
                  id: memeText.id,
                  prop: propName,
                  value: e.target.value,
                })
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};
