import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiBaseUrl}/users/sign_in`, {
        user: {
          email,
          password,
        },
      });

      if (response.status === 200) {
        document.cookie = `auth_token=${response.data.auth_token}; path=/`;
        setIsAuthenticated(true);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiBaseUrl}/users`, {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      if (response.status === 201) {
        document.cookie = `auth_token=${response.data.auth_token}; path=/`;
        setIsAuthenticated(true);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>
      <div className="mt-3">
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
