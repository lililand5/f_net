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


import React from "react";
import Leftsidebar from "./components/Leftsidebar";
import Maincontent from "./components/Maincontent";
import Navbar from "./components/Navbar";
import Rightsidebar from "./components/Rightsidebar";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
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
