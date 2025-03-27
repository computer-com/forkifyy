import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar = ({ sidebarOpen, setSidebarOpen, }) => {
  const location = useLocation(); 
  const navigate = useNavigate();

  // Handle Dashboard Click
  const handleDashboardClick = () => {
    if (location.pathname === "/AdminHome") {
      window.location.reload(); 
    } else {
      navigate("/AdminHome"); 
    }
  };

  return (
    <div>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <ul className="nav-menu">
          <li><button className="nav-link" onClick={handleDashboardClick}>Dashboard</button></li>
          <li><Link to="/admin/inventory" className="nav-link">Inventory</Link></li>
          <li><Link to="/admin/reservations" className="nav-link">Reservations</Link></li>
          <li><Link to="/admin/staff" className="nav-link">Staff Management</Link></li>
          <li><Link to="/admin/menu" className="nav-link">Menu </Link></li>
          <li><Link to="/admin/stats" className="nav-link">Analytics</Link></li>
          <li><Link to="/admin/settings" className="nav-link">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

