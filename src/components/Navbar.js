import React, {useEffect} from 'react';

import {  Link ,useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"> iNotebook </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"? "active":""}`}aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>

          </li>
        </ul>
        <Link to="/login" type="button" className="btn btn-primary mx-2">Login</Link>
        <Link to="/signup" type="button" className="btn btn-primary mx-2">Sign-Up</Link>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
