import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/OwnerDashboard.css";

const OwnerHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const restaurants = [
    { name: "Choice - Indian Restaurant", location: "Toronto", id: 1 },
    { name: "Spice Junction", location: "Mississauga", id: 2 },
    { name: "Grill House", location: "Brampton", id: 3 },
  ];

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Top Bar */}
      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Owner</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <main className="admin-home">
          <div className="dashboard-container">
            <div className="features-section">
              <h1 className="homepage-title">Welcome, Owner!</h1>
              <p className="page-subtitle">Here’s a quick glance at all your restaurants</p>
              {/* Optional: Add more widgets/cards here */}

              <div className="restaurant-grid">
                {restaurants.map((res) => (
                <div key={res.id} className="restaurant-card">
                    <h2>{res.name}</h2>
                    <p>{res.location}</p>
                    <button className="dashboard-btn">View Reports</button>
                </div>
                ))}
              </div>
            </div>
            
          </div>
        </main>
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerHome;
