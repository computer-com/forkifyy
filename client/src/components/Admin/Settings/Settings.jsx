import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FiMenu } from "react-icons/fi";
import logo from "../../../assets/images/Forkify_Logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/Settings.css";

const Settings = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-settings-container">
            {/* Sidebar Component */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Top Bar */}
            <div className="admin-settings-top-bar">
                <div className="admin-settings-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <FiMenu size={30} color="#FF8303" />
                </div>
                <div className="admin-settings-logo-container">
                    <a href="/AdminHome">
                        <img src={logo} alt="Forkify Logo" className="admin-settings-logo-img" />
                    </a>
                    <h1 className="admin-settings-logo-text">Forkify Admin</h1>
                </div>
                <h1 className="admin-settings-page-title">Settings</h1>
            </div>

            {/* Main Content */}
            <div className={`admin-settings-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
                <div className="admin-settings-content-section">
                    {/* Settings Grid Layout */}
                    <div className="settings-grid">
                        <div className="settings-card">
                            <h2>Profile Management</h2>
                            <p>Update your name, email, and other details.</p>
                            <Link to="/admin/settings/profile">
                                <button className="dashboard-btn">Manage</button>
                            </Link>
                        </div>

                        <div className="settings-card">
                            <h2>Change Password</h2>
                            <p>Update your account security credentials.</p>
                            <Link to="/admin/settings/password">
                                <button className="dashboard-btn">Change</button>
                            </Link>
                        </div>

                        <div className="settings-card">
                            <h2>Business Information</h2>
                            <p>Modify restaurant details like name & hours.</p>
                            <Link to="/admin/settings/business">
                                <button className="dashboard-btn">Edit</button>
                            </Link>
                        </div>

                        <div className="settings-card">
                            <h2>Admin User Management</h2>
                            <p>Manage admin users, roles, and permissions.</p>
                            <Link to="/admin/settings/users">
                                <button className="dashboard-btn">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="admin-settings-footer">
                <Footer />
            </div>
        </div>
    );
};

export default Settings;