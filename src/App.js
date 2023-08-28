import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Maincontent from "./components/Maincontent";
import Leftsidebar from "./components/Leftsidebar";
import Rightsidebar from "./components/Rightsidebar";
import Subscriptions from "./components/Subscriptions";
import Followers from "./components/Followers";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authTokenFromLocalStorage = localStorage.getItem("authToken");

    if (!authTokenFromLocalStorage) {
      const authTokenFromUrl = new URLSearchParams(location.search).get("token");

      if (authTokenFromUrl) {
        localStorage.setItem("authToken", authTokenFromUrl);
        navigate("/", { replace: true }); // перенаправить на главную страницу
      } else {
        const apiUrl = process.env.REACT_APP_API_URL;
        window.location.href = `${apiUrl}/users/sign_in`;
      }
    }
  }, [navigate, location.search]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/followers" element={<Followers />} />
      </Routes>
    </>
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
