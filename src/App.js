import './App.css';
import Routes from './navigation/Routes';
import NavBar from './navigation/NavBar';
import { BrowserRouter } from "react-router-dom";
import JoblyApi from './api.js';
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";



/** Jobly.
 *
 * - currentUser: updated from local storage token or by logging in or signing up.
 *     obj containing user data.
 *
 * - token: returned for logged in / signed up users. Stored in local storage. used for many api calls. Token is a JWT used for authentication.
 *
 *- applicationIds: set consisting of job id's of which the user has applied to. 
 */

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  //If token is not in state, check local storage and update state. Update API calls token.
  if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
    JoblyApi.token = localStorage.getItem("token");
  }

  //Logging a user. Return success : true or false.
  let handleLogin = async (formData) => {
    try {
      let res = await JoblyApi.login(formData);
      JoblyApi.token = res.token;
      setToken(res.token);
      localStorage.setItem("token", res.token);
      return { success: true };
    } catch (errors) {
      console.log(errors);
      console.error("login failed");
      return { success: false, errors };
    }
  };

  //Signing up a user. Return success : true or false.
  let handleSignup = async (formData) => {
    try {
      let res = await JoblyApi.signup(formData);
      setToken(res.token);
      localStorage.setItem("token", res.token);
    } catch (errors) {
      console.error("signup failed");
      return { success: false, errors };
    }
  };

  //Logout a user.
  let handleLogout = async () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  //Checking if user has applied for a given job.
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  //Logic for applying to a job. 
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  //If token state changes from intial null value, decode token for username, request user infomation from API and set currentUser state.
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
