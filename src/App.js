import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leftsidebar from "./components/Leftsidebar";
import Maincontent from "./components/Maincontent";
import Rightsidebar from "./components/Rightsidebar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <>
            <div className="container-fluid gedf-wrapper">
              <div className="row">
                <Leftsidebar />
                <Maincontent />
                <Rightsidebar />
              </div>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}
