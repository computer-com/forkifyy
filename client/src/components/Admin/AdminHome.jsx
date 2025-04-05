import React, { useState, useEffect } from "react";
import "../../assets/css/AdminCSS/AdminHome.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Forkify_Logo.png";
import axios from "axios";
import Sidebar from "../Admin/Sidebar";
import Footer from "../Admin/Footer";
import { FiMenu } from "react-icons/fi";

// Import Feature Card Images
import reservationsImg from "../../assets/images/Manager_Reservations.jpeg";
import inventoryImg from "../../assets/images/Manager_Inventory.jpeg";
import menuImg from "../../assets/images/Manager_Menu.jpg";
import salesReportImg from "../../assets/images/Manager_Sales.jpeg";

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    customers: 0,
    reservations: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  return (
    <div className="admin-home-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="admin-home-top-bar">
        <div className="admin-home-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="admin-home-logo-container">
          <a href="/AdminHome">
            <img src={logo} alt="Forkify Logo" className="admin-home-logo-img" />
          </a>
          <h1 className="admin-home-logo-text">Forkify Admin</h1>
        </div>
        <h1 className="admin-home-page-title">Dashboard</h1>
      </div>
      <div className={`admin-home-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-home-content-section">
          <div className="admin-home-features-section">
            <div className="admin-home-features-grid">
              <Link to="/admin/reservations" className="admin-home-feature-card">
                <img src={reservationsImg} alt="Reservations" />
                <h3>Reservations</h3>
              </Link>
              <Link to="/admin/inventory" className="admin-home-feature-card">
                <img src={inventoryImg} alt="Inventory" />
                <h3>Inventory</h3>
              </Link>
              <Link to="/admin/menu" className="admin-home-feature-card">
                <img src={menuImg} alt="Menu" />
                <h3>Menu</h3>
              </Link>
              <Link to="/admin/stats" className="admin-home-feature-card">
                <img src={salesReportImg} alt="Sales Report" />
                <h3>Sales Report</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default AdminHome;