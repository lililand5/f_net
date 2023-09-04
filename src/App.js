import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Maincontent from "./components/Maincontent";
import Leftsidebar from "./components/Leftsidebar";
import Rightsidebar from "./components/Rightsidebar";
import Subscriptions from "./components/Subscriptions";
import Followers from "./components/Followers";
import "./styles.css";

function MainLayout({ isAuthenticated }) {
  return (
    <div className="container-fluid gedf-wrapper">
      <div className="row">
        <Leftsidebar />
        {isAuthenticated ? <Maincontent /> : null}
        <Rightsidebar />
      </div>
    </div>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authTokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));

    if (authTokenCookie) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/followers" element={<Followers />} />
            {isAuthenticated && <Route path="/" element={<MainLayout isAuthenticated={isAuthenticated} />} />}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
