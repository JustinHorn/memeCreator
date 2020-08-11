import React from "react";

import { signInWithGoogle, signInWithGitHub } from "service/firebase";

export default () => (
  <>
    <span>Sign in with</span>
    <button onClick={signInWithGoogle}>Google</button>
    <button onClick={signInWithGitHub}>Github</button>
  </>
);
