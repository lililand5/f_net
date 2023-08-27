import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Maincontent from "./components/Maincontent";
import Leftsidebar from "./components/Leftsidebar";
import Rightsidebar from "./components/Rightsidebar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Subscriptions from "./components/Subscriptions";
import Followers from "./components/Followers";
import HelloComponent from './HelloComponent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
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
      <HelloComponent />
        <Leftsidebar />
        <Maincontent />
        <Rightsidebar />
      </div>
    </div>
  );
}

export default App;

// import React from 'react';
// import HelloComponent from './HelloComponent';

// function App() {
//   return (
//     <div className="App">
//       <HelloComponent />
//     </div>
//   );
// }

// export default App;
