import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FiMenu } from "react-icons/fi";
import logo from "../../../assets/images/Forkify_Logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/Settings.css";

const Settings = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state

    return (
        <div className={`settings-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            {/* Sidebar Component */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Wrap everything in a full-height container like AdminHome */}
            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    {/* Sidebar Toggle Button */}
                    <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FiMenu size={30} color="#FF8303" />
                    </div>

                    {/* Logo */}
                    <div className="logo-container">
                        <img src={logo} alt="Forkify Logo" className="logo-img" />
                        <h1 className="logo-text">Forkify Admin</h1>
                    </div>

                    {/* Page Title */}
                    <h1 className="page-title">Settings</h1>
                </div>

                {/* Settings Grid Layout */}
                <div className="settings-grid">
                    <div className="settings-card">
                        <h2>Profile Management</h2>
                        <p>Update your name, email, and other details.</p>
                        <Link to="/admin/settings/profile">
                            <button className="settings-btn">Manage</button>
                        </Link>
                    </div>

                    <div className="settings-card">
                        <h2>Change Password</h2>
                        <p>Update your account security credentials.</p>
                        <Link to="/admin/settings/password">
                            <button className="settings-btn">Change</button>
                        </Link>
                    </div>

                    <div className="settings-card">
                        <h2>Business Information</h2>
                        <p>Modify restaurant details like name & hours.</p>
                        <Link to="/admin/settings/business">
                            <button className="settings-btn">Edit</button>
                        </Link>
                    </div>

                    <div className="settings-card">
                        <h2>Admin User Management</h2>
                        <p>Manage admin users, roles, and permissions.</p>
                        <Link to="/admin/settings/users">
                            <button className="settings-btn">View</button>
                        </Link>
                    </div>
                </div>

                {/* Footer inside full-page container */}
                <Footer />
            </div>
        </div>
    );
};

export default Settings;
