import React, { useContext } from "react";
import { MemeTextsContext } from "../index";

import styles from "./memeOptions.module.css";

export default ({ topOrBottom }) => {
  const { space, setSpace } = useContext(MemeTextsContext);

  const v = topOrBottom;
  const vColor = topOrBottom + "Color";

  const set = (property) => (e) => {
    const s = { ...space };
    s[property] = e.target.value;
    setSpace(s);
  };

  return (
    <div className={styles.cssOption}>
      Set top padding
      <br />
      <input
        type="range"
        min="0"
        max="100"
        value={space[v]}
        onChange={set(v)}
        className={styles.cssOptionInput}
      />
      <br />
      color:
      <br />
      <input
        className={styles.cssOptionInput}
        type="text"
        value={space[vColor]}
        onChange={set(vColor)}
      />
    </div>
  );
};
