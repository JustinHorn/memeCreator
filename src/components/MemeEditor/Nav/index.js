import React, { useState } from "react";
import styles from "./index.module.css";
import downloadImg from "../downloadImg";
import { Redirect } from "react-router-dom";
import FireBaseSignIn from "components/FireBaseSignIn";

const Nav = ({ imageNodeRef, getImage, memeName }) => {
  const [goHome, setGoHome] = useState(false);

  return (
    <div className={styles.navContainer}>
      {goHome && <Redirect to="/memeCreator/"></Redirect>}
      <button className={styles.navButton} onClick={() => setGoHome(!goHome)}>
        Home
      </button>
      <button className={styles.navButton}>
        <label htmlFor="files">Upload an Image</label>
      </button>
      <input
        id="files"
        type="file"
        name="load image"
        accept="image/png, image/jpeg"
        onChange={getImage}
        style={{ display: "none" }}
      />
      <button
        className={styles.navButton}
        onClick={() => {
          downloadImg(imageNodeRef.current, memeName);
        }}
      >
        Download Meme
      </button>
      <button className={styles.navButton}>Share</button>
      <FireBaseSignIn />
    </div>
  );
};

export default Nav;
