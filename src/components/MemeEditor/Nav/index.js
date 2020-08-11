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
      <button onClick={() => setGoHome(!goHome)}>Home</button>
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
          downloadImg(imageNodeRef.current, memeName);
        }}
      >
        Download Meme
      </button>
      <a>Share</a>
      <FireBaseSignIn />
    </div>
  );
};

export default Nav;
