// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


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

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <Leftsidebar />
          <Maincontent />
          <Rightsidebar />
        </div>
      </div>
    </>
  );
}
