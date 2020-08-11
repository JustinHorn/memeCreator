import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAUT429SZZhzKtWu84CWyZTlLcEVJGz8vA",
  authDomain: "memecreator-c2665.firebaseapp.com",
  databaseURL: "https://memecreator-c2665.firebaseio.com",
  projectId: "memecreator-c2665",
  storageBucket: "memecreator-c2665.appspot.com",
  messagingSenderId: "634063807183",
  appId: "1:634063807183:web:567101b2f2402719fb4dba",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logOut() {
  auth().signOut();
}
