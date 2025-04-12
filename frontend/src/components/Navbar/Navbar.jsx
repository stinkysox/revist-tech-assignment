import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaSearch, FaBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token: ", decodedToken);
      setUsername(decodedToken.username);
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    window.location.href = "/auth";
  };

  console.log("Username in Navbar: ", username);
  return (
    <div className="navbar">
      <div className="nav-one">
        <div className="nav-logo-section">
          <FaShoppingCart className="cart-icon" />
          <h2>FastCart</h2>
        </div>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="search" placeholder="Search" />
        </div>
      </div>

      <div className="nav-two">
        <MdMessage className="message-icon" />

        <div className="icon-with-badge">
          <FaBell className="bell-icon" />
          <span className="notification-badge">3</span>
        </div>

        <div className="name-section">
          <div className="circle">
            {username ? username.charAt(0).toUpperCase() : "G"}
          </div>
          <p>{username || "Guest"}</p>
          <FaAngleDown />
          {username && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
