import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { Navbar } from "react-bootstrap";
import './NavBar.css'

//renders navigation bar on page. Two different display. One for logged in user and one for signed out user.

//Determines if user is logged in from context.

function NavBar({ logoutFunc }) {

  //allows for the determination of which nav bar to use.
  const { currentUser } = useContext(UserContext);

  //navbar for logged in user.
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
  
  //navbar for logged out users.
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
