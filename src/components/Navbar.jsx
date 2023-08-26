import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-white">
        <a href="#" className="navbar-brand">
          My network
        </a>
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
          <button type="submit" className="btn btn-primary mr-2">
            Log In
          </button>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </nav>
    </>
  );
}
