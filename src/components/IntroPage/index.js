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
      <Link to="/memeCreator/memetypes" className={styles.Link}>
        Get Started
      </Link>
      <br />
      <div className={styles.imgContainer}>
        {meme.slice(0, 9).map((x) => (
          <img className={styles.images} src={x} alt="img1"></img>
        ))}
      </div>
    </div>
  );
};
