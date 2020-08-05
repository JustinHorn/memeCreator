import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./intropage.module.css";

export default () => {
  return (
    <div className={styles.component}>
      <br />
      <nav>
        <button>Categories</button>
        <button>Sign In</button>{" "}
      </nav>
      <br />
      <h1>Welcome to the Meme creator</h1>
      <br />
      <Link to="/memeCreator/memetypes" className={styles.Link}>
        Get Started
      </Link>
      <br />
      <div className={styles.imgContainer}>
        <img src="https://picsum.photos/200" alt="img1"></img>
        <img src="https://picsum.photos/200" alt="img2"></img>
        <img src="https://picsum.photos/200" alt="img3"></img>
        <img src="https://picsum.photos/200" alt="img4"></img>
        <img src="https://picsum.photos/200" alt="img5"></img>
        <img src="https://picsum.photos/200" alt="img6"></img>
        <img src="https://picsum.photos/200" alt="img7"></img>
        <img src="https://picsum.photos/200" alt="img8"></img>
        <img src="https://picsum.photos/200" alt="img9"></img>
      </div>
    </div>
  );
};
