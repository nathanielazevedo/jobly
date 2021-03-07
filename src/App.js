import './App.css';
import Routes from './Routes';
import NavBar from './NavBar';
import { BrowserRouter } from "react-router-dom";
import JoblyApi from './api.js';
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.log(`ConsoleToken: ${token}`);
  console.log(`ConsoleUser`, currentUser);

  if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
    JoblyApi.token = localStorage.getItem("token");
  }

  let handleLogin = async (formData) => {
    let res = await JoblyApi.login(formData);
    setToken(res.token);
    localStorage.setItem("token", res.token);
  };

  let handleSignup = async (formData) => {
    let res = await JoblyApi.signup(formData);
    setToken(res.token);
    localStorage.setItem("token", res.token);
  };

  let handleLogout = async () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  useEffect(
    function () {
      async function userInfo() {
        let { username } = jwt.decode(token);
        let user = await JoblyApi.getUserInfo(username);
        setCurrentUser(user);
        setApplicationIds(new Set(user.applications));
      }
      if (token) {
        userInfo();
      }
    },
    [token]
  );

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <NavBar logoutFunc={(f) => handleLogout(f)} />
        <div className="container">
          <Routes
            loginFunc={(f) => handleLogin(f)}
            signupFunc={(f) => handleSignup(f)}
          />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
