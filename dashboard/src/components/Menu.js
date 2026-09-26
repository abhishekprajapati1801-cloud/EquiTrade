import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "USERID");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = `${FRONTEND_URL}/login`;
  };

  const getInitials = (name) => {
    if (!name || name === "USERID") return "ZU";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <a href={FRONTEND_URL}>
        <img src="logo.png" style={{ width: "50px" }} alt="Kite Logo" />
      </a>
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick} style={{ position: "relative", cursor: "pointer" }}>
          <div className="avatar">{getInitials(username)}</div>
          <p className="username">{username}</p>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: "0",
                background: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                padding: "10px",
                zIndex: 1000,
                minWidth: "140px",
              }}
            >
              <p style={{ margin: 0, paddingBottom: "8px", fontSize: "12px", borderBottom: "1px solid #eee" }}>
                Logged in as <strong>{username}</strong>
              </p>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#df514c",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  paddingTop: "8px",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
