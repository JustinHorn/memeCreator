import React, { useContext } from "react";

import styles from "./index.module.css";

import { MemeTextsContext } from "../../index";

export default ({ v, removeMemeText, memeTextIndex }) => {
  const { changeMemeTexts } = useContext(MemeTextsContext);
  return (
    <div>
      <div>
        <h5 className={styles.headline}>
          {v.text}
          <img
            className={styles.removeButton}
            src="/memeCreator/src/icon/remove.png"
            onClick={() =>
              changeMemeTexts({ type: "removeText", index: memeTextIndex })
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
              value={v.style[propName]}
              onChange={(e) =>
                changeMemeTexts({
                  type: "changeTextStyle",
                  index: memeTextIndex,
                  prop: propName,
                  value: e.target.value,
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
