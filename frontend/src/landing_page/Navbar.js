import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../config";

function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white">
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%", minWidth: "120px" }}
            alt="Zerodha Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
            {username ? (
              <>
                <li className="nav-item me-3">
                  <a href={DASHBOARD_URL} className="btn btn-outline-primary btn-sm px-3">
                    Kite Dashboard ({username})
                  </a>
                </li>
                <li className="nav-item me-3">
                  <button onClick={handleLogout} className="btn btn-link nav-link text-danger text-decoration-none">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link text-muted font-weight-bold" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link text-muted font-weight-bold" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item me-3">
              <Link className="nav-link text-muted" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-muted" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-muted" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link text-muted" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
