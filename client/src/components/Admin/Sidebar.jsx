import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/css/AdminCSS/AdminSidebar.css";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  return (
    <div id="owner-sidebar" className={sidebarOpen ? "sidebar-open" : ""}>
      <ul id="owner-sidebar-menu">
        <li>
          <Link 
            to="/AdminHome" 
            className={location.pathname === "/AdminHome" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/inventory" 
            className={location.pathname === "/admin/inventory" ? "active" : ""}
          >
            Inventory
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/reservations" 
            className={location.pathname === "/admin/reservations" ? "active" : ""}
          >
            Reservations
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/staff" 
            className={location.pathname === "/admin/staff" ? "active" : ""}
          >
            Staff Management
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/menu" 
            className={location.pathname === "/admin/menu" ? "active" : ""}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/stats" 
            className={location.pathname === "/admin/stats" ? "active" : ""}
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/settings" 
            className={location.pathname === "/admin/settings" ? "active" : ""}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;