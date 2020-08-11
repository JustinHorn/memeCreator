import React, { useState, useEffect } from "react";

import { auth } from "service/firebase";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const authorized = user ? true : false;

  return (
    <AuthContext.Provider value={{ authorized, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// make x more visible
