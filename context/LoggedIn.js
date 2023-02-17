import { useState, useContext, createContext, useEffect } from "react";

import postRequest from "../utils/postRequest";

const LoggedInContext = createContext();

export const useLoggedIn = () => useContext(LoggedInContext);

const LoggedIn = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState("");
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("camrav-token")) {
      postRequest("/api/authorize", {
        token: localStorage.getItem("camrav-token"),
      }).then(({ authorized }) => {
        if (authorized) setLoggedIn(true);
        else {
          localStorage.removeItem("camrav-token");
          setLoggedIn(false);
        }
      });
    } else {
      setLoggedIn(false);
    }
  }, [key]);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setKey }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedIn;
