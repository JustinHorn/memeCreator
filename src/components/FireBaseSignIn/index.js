import React, { useContext } from "react";

import { signInWithGoogle, signInWithGitHub } from "service/firebase";

import { AuthContext } from "context/Auth";
export default () => {
  const { authorized, user } = useContext(AuthContext);

  return (
    <div>
      {(authorized && <span>signed in with {user.email} </span>) || (
        <>
          <span>Sign in with </span>
          <button onClick={signInWithGoogle}> Google </button>
          <button onClick={signInWithGitHub}> Github </button>
        </>
      )}
    </div>
  );
};
