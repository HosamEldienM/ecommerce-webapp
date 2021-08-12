import "./App.css";

import React, { useEffect, useState } from "react";

import { auth, db } from "./config/config";
import { BrowserRouter as Router } from "react-router-dom";
import "./bootstrap.css";
import { LangContext, UserContext } from "./contexts/contexts";

import Routing from "./components/routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = function () {
  const [Lang, setLang] = useState("en");
  const [User, setUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        db.collection("Users")
          .where("Email", "==", user.email)
          .get()
          .then((res) =>
            res.forEach((x) => {
              setUser({ ...x.data(), ID: x.id });
            })
          );
      }
    });
  }, [auth.currentUser]);

  return (
    <div>
      <LangContext.Provider value={{ Lang, setLang }}>
        <UserContext.Provider value={{ User, setUser }}>
          <Router>
            <Routing />
          </Router>
        </UserContext.Provider>
      </LangContext.Provider>
      <ToastContainer />
    </div>
  );
};
export default App;
