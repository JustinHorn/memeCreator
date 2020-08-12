import React, { useContext } from "react";

import { logOut, signInWithGoogle, signInWithGitHub } from "service/firebase";

import { AuthContext } from "context/Auth";
import styles from "./FireBaseSignIn.module.css";

export default () => {
  const { authorized, user } = useContext(AuthContext);

  return (
    <div className={styles.body}>
      {(authorized && (
        <span>
          {user.email} <button onClick={logOut}> Logout</button>
        </span>
      )) || (
        <>
          <span>Sign in with </span>
          <button className={styles.iconButton} onClick={signInWithGoogle}>
            <img
              className={styles.icon}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
            ></img>
          </button>
          <button className={styles.iconButton} onClick={signInWithGitHub}>
            <img
              className={styles.icon}
              src={"/memeCreator/src/icon/gitHub.png"}
              alt="github"
            ></img>
          </button>
        </>
      )}
    </div>
  );
};
