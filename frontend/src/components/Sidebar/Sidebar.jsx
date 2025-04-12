import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaChartBar,
  FaEnvelope,
  FaBook,
  FaLightbulb,
  FaUserCog,
  FaCog,
  FaClipboardList,
  FaFolderOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [active, setActive] = useState("Categories");

  const navItems = [
    { label: "Dashboard", icon: <FaHome /> },
    { label: "Orders", icon: <FaClipboardList />, badge: 16 },
    { label: "Products", icon: <FaBoxOpen /> },
    { label: "Categories", icon: <FaFolderOpen /> },
    { label: "Customers", icon: <FaUsers /> },
    { label: "Reports", icon: <FaChartBar /> },
    { label: "Coupons", icon: <FaTags /> },
    { label: "Inbox", icon: <FaEnvelope /> },
  ];

  const otherInfo = [
    { label: "Knowledge Base", icon: <FaBook /> },
    { label: "Product Updates", icon: <FaLightbulb /> },
  ];

  const settings = [
    { label: "Personal Settings", icon: <FaUserCog /> },
    { label: "Global Settings", icon: <FaCog /> },
  ];

  const renderItem = (item, index) => (
    <motion.div
      key={item.label}
      className={`sidebar-item ${active === item.label ? "active" : ""}`}
      onClick={() => setActive(item.label)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <span className="icon">{item.icon}</span>
      <span className="label">{item.label}</span>
      {item.badge && <span className="badge">{item.badge}</span>}
    </motion.div>
  );

  return (
    <motion.div
      className="sidebar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section">{navItems.map(renderItem)}</div>

      <p className="section-title">Other Information</p>
      <div className="section">{otherInfo.map(renderItem)}</div>

      <p className="section-title">Settings</p>
      <div className="section">{settings.map(renderItem)}</div>
    </motion.div>
  );
};

export default Sidebar;
