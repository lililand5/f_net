import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Maincontent from "./components/Maincontent";
import Leftsidebar from "./components/Leftsidebar";
import Rightsidebar from "./components/Rightsidebar";
import Subscriptions from "./components/Subscriptions";
import Followers from "./components/Followers";

function App() {
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      const apiUrl = process.env.REACT_APP_API_URL;
      window.location.href = `${apiUrl}/users/sign_in`;

    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/followers" element={<Followers />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div className="container-fluid gedf-wrapper">
      <div className="row">
        <Leftsidebar />
        <Maincontent />
        <Rightsidebar />
      </div>
    </div>
  );
}

export default App;
