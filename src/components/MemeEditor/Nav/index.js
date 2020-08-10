import React from "react";
import styles from "./index.module.css";
import downloadImg from "../downloadImg";
import memeStyles from "../TextImage/index.module.css";
import useImage from "../useImage";

const Nav = ({ image, getImage }) => {
  return (
    <div className={styles.navContainer}>
      <a>Home</a>
      <label htmlFor="files" className={styles.Button}>
        Upload an Image
      </label>
      <input
        id="files"
        type="file"
        name="load image"
        accept="image/png, image/jpeg"
        onChange={getImage}
        style={{ display: "none" }}
      />
      <button
        className={styles.Button}
        onClick={() => {
          const node = document.querySelector("." + memeStyles.memeImage);
          downloadImg(node);
        }}
      >
        Download Meme
      </button>
      <a>Share</a>
      <a>Sign in</a>
    </div>
  );
};

export default Nav;
