import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./intropage.module.css";

import FireBaseSignIn from "components/FireBaseSignIn";

export default () => {
  const [meme, setMeme] = useState([]);
  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
        setMeme(result.data.memes.map((x) => x.url)); // <-- this is an array of urls
      })
      .catch((error) => {});
  }, []);

  return (
    <div className={styles.component}>
      <IntroNav></IntroNav>
      <h1 className={styles.title}>Welcome to the Meme creator</h1>
      <div className={styles.memeSelectionContainer}>
        <TextInOut> </TextInOut>
        <FreeStyle></FreeStyle>
      </div>
      <h2 className={styles.titleExample}>
        Examples Images you can use for your memes
      </h2>
      <div className={styles.imgContainer}>
        {meme.slice(0, 9).map((x) => (
          <img className={styles.images} src={x} alt="img1"></img>
        ))}
      </div>
    </div>
  );
};

const IntroNav = () => {
  return (
    <nav>
      <Link to="/textInOfImage">
        <button className={styles.navButton}>
          <span>Top/Bottom Text Meme</span>
        </button>
      </Link>
      <Link to="/freestyle">
        <button className={styles.navButton}>
          <span>FreeStyle Meme</span>
        </button>
      </Link>
      <FireBaseSignIn />
    </nav>
  );
};

const TextInOut = () => {
  return (
    <Link className={styles.linkMemeTypes} to="/textInOfImage">
      <h2>Top/Bottom Text</h2>
      <p>
        Design a meme with a top and a Bottom text! You can custumize if the
        text is inside or Outside the meme
      </p>
      <div className={styles.memeImgCont}>
        <img
          className={styles.memeTypesImg}
          src={require("./memeTextInside.jpg")}
          alt="memeTextInside"
        ></img>
        <img
          className={styles.memeTypesImg}
          src={require("./memeTextOutside.jpg")}
          alt="memeTextOutside"
        ></img>
      </div>
    </Link>
  );
};

const FreeStyle = () => {
  return (
    <Link className={styles.linkMemeTypes} to="/freestyle">
      <h2>FreeStyle</h2>
      <p>
        Put your text wherever you want in the meme! Try this awesome freestyle
        editor.
      </p>

      <img
        className={styles.memeTypesImg}
        src={require("./memeFreestyle.jpg")}
        alt="serious"
      ></img>
    </Link>
  );
};
