import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/OwnerCSS/OwnerSidebar.css";

const OwnerSidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><Link to="/owner/dashboard">Dashboard</Link></li>
        <li><Link to="/owner/reports">Manager Reports</Link></li>
        <li><Link to="/owner/performance">Performance</Link></li>
        <li><Link to="/owner/settings">Settings</Link></li>
        <li><Link to="/owner/support">Support</Link></li>
      </ul>
    </div>
  );
};

export default OwnerSidebar;
