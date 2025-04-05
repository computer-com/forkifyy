import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/css/OwnerCSS/OwnerSidebar.css";

const OwnerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  return (
    <div id="owner-sidebar" className={sidebarOpen ? "sidebar-open" : ""}>
      <ul id="owner-sidebar-menu">
        <li>
          <Link 
            to="/owner/dashboard" 
            className={location.pathname === "/owner/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/owner/reports" 
            className={location.pathname === "/owner/reports" ? "active" : ""}
          >
            Manager Reports
          </Link>
        </li>
        <li>
          <Link 
            to="/owner/performance" 
            className={location.pathname === "/owner/performance" ? "active" : ""}
          >
            Performance
          </Link>
        </li>
        <li>
          <Link 
            to="/owner/settings" 
            className={location.pathname === "/owner/settings" ? "active" : ""}
          >
            Settings
          </Link>
        </li>
        <li>
          <Link 
            to="/owner/support" 
            className={location.pathname === "/owner/support" ? "active" : ""}
          >
            Support
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OwnerSidebar;