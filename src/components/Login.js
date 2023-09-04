import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiBaseUrl}/users/sign_in`, {
        user: {
          email,
          password,
        },
      }, {
        // withCredentials: true
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

  return (
    <div className="container mt-5">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
