import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaSearch, FaBell, FaAngleDown } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { motion } from "framer-motion";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded Token:", decodedToken);
        setUsername(decodedToken.username);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    window.location.href = "/auth";
  };

  return (
    <motion.div
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="nav-one"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="nav-logo-section">
          <FaShoppingCart className="cart-icon" />
          <h2>FastCart</h2>
        </div>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="search" placeholder="Search" />
        </div>
      </motion.div>

      <motion.div
        className="nav-two"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
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
            <motion.div
              className="logout-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
