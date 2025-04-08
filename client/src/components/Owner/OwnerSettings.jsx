import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/forkify_logo.png";
import "../../assets/css/OwnerCSS/OwnerSettings.css";

const OwnerSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed for consistency

  return (
    <div className="settings-container">
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="settings-top-bar">
        <div className="settings-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="settings-logo-container">
          <a href="/owner/dashboard">
            <img src={logo} alt="Forkify Logo" className="settings-logo-img" />
          </a>
          <h1 className="settings-logo-text">Forkify Owner</h1>
        </div>
        <h1 className="settings-page-title">Settings</h1>
      </div>
      <div className={`settings-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="settings-content-section">
          <div className="settings-grid">
            <div className="settings-card">
              <h2>Business Details</h2>
              <p>Edit restaurant names, hours, contact, and important information.</p>
              <Link to="/owner/settings/business">
                <button className="settings-btn">Edit</button>
              </Link>
            </div>
            <div className="settings-card">
              <h2>Add Restaurant</h2>
              <p>Add a new restaurant to your portfolio.</p>
              <Link to="/owner/add-restaurant">
                <button className="settings-btn">Add</button>
              </Link>
            </div>
            <div className="settings-card">
              <h2>Report Access</h2>
              <p>Control access to sales, inventory, and performance data.</p>
              <Link to="/owner/settings/reports">
                <button className="settings-btn">Set Rules</button>
              </Link>
            </div>
            <div className="settings-card">
              <h2>Support</h2>
              <p>Contact help desk or submit a support request.</p>
              <Link to="/owner/settings/support">
                <button className="settings-btn">Help</button>
              </Link>
            </div>
            <div className="settings-card">
              <h2>Manager Management</h2>
              <p>Add, remove, or update your managers.</p>
              <Link to="/owner/settings/managers">
                <button className="settings-btn">Control</button>
              </Link>
            </div>
            <div className="settings-card">
              <h2>Restaurant Preferences</h2>
              <p>Customize branding, themes, or cuisine types.</p>
              <Link to="/owner/settings/preferences">
                <button className="settings-btn">Customize</button>
              </Link>
            </div>
            <div className="settings-card">
              <h2>Notifications</h2>
              <p>Manage alerts and delivery email preferences.</p>
              <Link to="/owner/settings/notifications">
                <button className="settings-btn">Configure</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-footer">
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerSettings;