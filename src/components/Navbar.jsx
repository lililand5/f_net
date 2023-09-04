import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-white">
        <a href="#" className="navbar-brand">
          My network
        </a>
        {/* <form className="form-inline">
          <Link to="/login" className="btn btn-primary mr-2">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </form> */}
      </nav>
    </>
  );
}













// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// export default function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleSignOut = () => {
//     axios.delete(`${process.env.REACT_APP_API_URL}/users/sign_out`, {
//       withCredentials: true
//     })
//     .then(response => {
//       if (response.status === 200) {
//         setIsAuthenticated(false);
//         localStorage.removeItem('authToken');
//       }
//     })
//     .catch(error => {
//       console.error('Error during sign out:', error.message);
//     });
//   };

//   return (
//     <>
//       <nav className="navbar navbar-light bg-white">
//       <Link to="/" className="navbar-brand logo-link">My Network</Link>
//         {/* <form className="form-inline">
//           <div className="input-group mr-2">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Recipient's username"
//               aria-describedby="button-addon2"
//             />
//             <div className="input-group-append">
//               <button
//                 className="btn btn-outline-primary"
//                 type="button"
//                 id="button-addon2"
//               >
//                 <i className="fa fa-search"></i>
//               </button>
//             </div>
//           </div>
//         </form> */}
//       </nav>
//     </>
//   );
// }
