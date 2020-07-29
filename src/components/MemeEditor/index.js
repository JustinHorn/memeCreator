import React from "react";

import { useParams } from "react-router-dom";

import styles from "./index.module.css";

export default () => {
  let { memetype } = useParams();

  return (
    <div>
      <div className={styles.editor}>
        {" "}
        <div className={styles.header}>
          <h3>This is the MemeEditor </h3>
          <div>
            page with memetype:
            <b>
              <i> {memetype} </i>
            </b>
          </div>
        </div>
        <div className={styles.options}>
          <input type="text" value="Option 1" />
          <input type="text" value="Option 2" />
          <input type="text" value="Option 3" />
        </div>
        <div className={styles.meme}>{/* Meme goes here*/}</div>
      </div>
      <img src="" alt="this will be the result" />
    </div>
  );
};
