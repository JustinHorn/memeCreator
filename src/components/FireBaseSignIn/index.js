import React, { useContext } from "react";

import { signInWithGoogle, signInWithGitHub } from "service/firebase";

import { AuthContext } from "context/Auth";
import styles from "./FireBaseSignIn.module.css";

export default () => {
  const { authorized, user } = useContext(AuthContext);

  return (
    <div className={styles.signInContainer}>
      {(authorized && <span className={styles.signIn}>{user.email} </span>) || (
        <>
          <span>Sign in with </span>
          <button onClick={signInWithGoogle}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
            ></img>
          </button>
          <button onClick={signInWithGitHub}>
            <img src={require("./GitHub.png")} alt="github"></img>
          </button>
        </>
      )}
    </div>
  );
};
