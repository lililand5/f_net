import React from "react";

export default function Login() {
  return (
    <div className="container mt-5">
      <h2>Log In</h2>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
