import React, { useState, useEffect } from "react";
import "../../assets/css/AdminCSS/AdminHome.css";
import "../../assets/css/AdminCSS/Footer.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Forkify_Logo.png";
import axios from "axios";
import Sidebar from "../Admin/Sidebar"; 
import Footer from "../Admin/Footer";

// Import Feature Card Images
import reservationsImg from "../../assets/images/Manager_Reservations.jpeg";
import inventoryImg from "../../assets/images/Manager_Inventory.jpeg";
import menuImg from "../../assets/images/Manager_Menu.jpg";
import salesReportImg from "../../assets/images/Manager_Sales.jpeg";
import bannerImg from "../../assets/images/Manager_Banner.png";


const AdminHome = () => {
  const navigate = useNavigate();
  const [setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    customers: 0,
    reservations: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch Dashboard Statistics
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => console.error("Error fetching statistics:", error));

    axios
      .get("http://localhost:5000/api/recent-activity")
      .then((response) => {
        setRecentActivity(response.data);
      })
      .catch((error) => console.error("Error fetching recent activity:", error));
  }, []);

  // Function to Refresh Page
  const handleRefresh = () => {
    navigate("/AdminHome");
    window.location.reload();
  };

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Top Bar with Logo & Page Title */}
      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </div>
        <div className="logo-container" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Admin</h1>
        </div>
      </div>

      <div className="main-content">
        {/* Main Content */}
        <main className="admin-home">
          <div className="dashboard-container">
            <div className="features-section">
              <h1>Choice - Indian Restaurant</h1>
              <div className="banner-section">
                <img src={bannerImg} alt="Restaurant Banner" className="banner-img" />
              </div>
              <div className="features-grid">
                <Link to="/admin/reservations" className="feature-card">
                  <img src={reservationsImg} alt="Reservations" />
                  <h3>Reservations</h3>
                </Link>
                <Link to="/admin/inventory" className="feature-card">
                  <img src={inventoryImg} alt="Inventory" />
                  <h3>Inventory</h3>
                </Link>
                <Link to="/admin/menu" className="feature-card">
                  <img src={menuImg} alt="Menu" />
                  <h3>Menu</h3>
                </Link>
                <Link to="/admin/stats" className="feature-card">
                  <img src={salesReportImg} alt="Sales Report" />
                  <h3>Sales Report</h3>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />        
    </div>
  );
};

export default AdminHome;
