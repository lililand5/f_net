import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-white">
        <a href="/" className="navbar-brand">My network</a>
        <form className="form-inline">
          <div className="input-group mr-2">
            <input
              type="text"
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                type="button"
                id="button-addon2"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <Link to="/subscriptions" className="btn btn-primary ml-2">Subscriptions</Link>
          <Link to="/followers" className="btn btn-primary">View Followers</Link>
          <Link to="/login" className="btn btn-primary ml-2">Log In</Link>
          <Link to="/signup" className="btn btn-primary ml-2">Sign Up</Link>
        </form>
      </nav>
    </>
  );
}
