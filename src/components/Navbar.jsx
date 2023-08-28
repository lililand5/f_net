import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/logged_in`, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIsAuthenticated(data.logged_in);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
      });
  }, []);

  const handleSignOut = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/sign_out`, {
      withCredentials: true
    })
    .then(response => {
      if (response.status === 200) {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
      }
    })
    .catch(error => {
      console.error('Error during sign out:', error.message);
    });
  };

  return (
    <>
      <nav className="navbar navbar-light bg-white">
      <Link to="/" className="navbar-brand logo-link">My Network</Link>
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
        </form>
      </nav>
    </>
  );
}
