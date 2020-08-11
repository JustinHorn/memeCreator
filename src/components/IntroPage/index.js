import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./intropage.module.css";

export default () => {
  const [meme, setMeme] = useState([]);
  useEffect(() => {
    fetch(" https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMeme(result.data.memes.map((x) => x.url)); // <-- this is an array of urls
      })
      .catch((error) => {});
  }, []);

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
      <div>
        <Link className={styles.linkMemeTypes} to="/memeCreator/textInOfImage">
          Text in image
          <img
            className={styles.memeTypesImg}
            src="https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk"
            alt="funny"
          ></img>
        </Link>
        <Link className={styles.linkMemeTypes} to="/memeCreator/freestyle">
          <h3>Editor 2</h3>
          <img
            className={styles.memeTypesImg}
            src="https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk"
            alt="serious"
          ></img>
        </Link>
      </div>
      <br />
      <div className={styles.imgContainer}>
        {meme.slice(0, 20).map((x) => (
          <img src={x} alt="img1"></img>
        ))}
      </div>
    </div>
  );
};
