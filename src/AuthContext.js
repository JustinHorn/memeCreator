import React, { useState, useEffect } from "react";

import { auth } from "service/firebase";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      console.log("Authorized: " + (user ? true : false));
      setAuthorized(user ? true : false);
    });
  }, []);

  return (
    <AuthContext.Provider value={authorized}>{children}</AuthContext.Provider>
  );
};

// make x more visible
