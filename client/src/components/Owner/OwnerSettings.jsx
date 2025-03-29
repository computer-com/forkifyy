import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/OwnerSettings.css";

const OwnerSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`owner-settings-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="main-content">
            {/* Top Bar */}
            <div className="top-bar">
            <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FiMenu size={30} color="#FF8303" />
            </div>

            <div className="logo-container">
                <img src={logo} alt="Forkify Logo" className="logo-img" />
                <h1 className="logo-text">Forkify Owner</h1>
            </div>

            <h1 className="page-title">Settings</h1>
            </div>
            <div className="setting-section">
                {/* Grid of Owner Setting Options */}
                <div className="settings-grid">
                    <div className="settings-card">
                        <h2>Business Details</h2>
                        <p>Edit restaurant names, hours, contact, and logos.</p>
                        <Link to="/owner/settings/business">
                        <button className="settings-btn">Edit</button>
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
            <OwnerFooter />
        </div>
    </div>
  );
};

export default OwnerSettings;
