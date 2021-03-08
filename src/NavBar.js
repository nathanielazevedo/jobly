import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { Navbar } from "react-bootstrap";
import './NavBar.css'

function NavBar({ logoutFunc }) {
  const { currentUser } = useContext(UserContext);

  function loggedIn() {
    return (
      <Navbar bg="dark" variant="dark" className="navbar">
        <Link to="/" className="navbar-brand text-light">
          Jobly
        </Link>
        <Link to="/companies" className="nav-link text-light ">
          Companies
        </Link>
        <Link to="/jobs" className="nav-link text-light">
          Jobs
        </Link>
        <Link to="/profile" className="nav-link text-light">
          {currentUser.username}
        </Link>
        <Link to="/" className="nav-link text-light" onClick={logoutFunc}>
          Logout
        </Link>
      </Navbar>
    );
  }

  function loggedOut() {
    return (
      <Navbar bg="dark" variant="dark" className="navbar">
        <Link to="/" className="navbar-brand text-light">
          Jobly
        </Link>
        <Link to="/login" className="nav-link text-light">
          Login
        </Link>
        <Link to="/signup" className="nav-link text-light">
          Signup
        </Link>
      </Navbar>
    );
  }
  
  return currentUser ? loggedIn() : loggedOut();
}



export default NavBar;
