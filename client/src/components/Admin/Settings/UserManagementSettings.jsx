import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FiMenu } from "react-icons/fi";
import logo from "../../../assets/images/Forkify_Logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/Settings.css";

const AdminUserManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state

    // Mock data for admin users
    const users = [
        { id: 1, name: "John Doe", role: "Admin" },
        { id: 2, name: "Jane Smith", role: "Manager" },
    ];

    return (
        <div className={`settings-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            {/* Sidebar Component */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FiMenu size={30} color="#FF8303" />
                    </div>

                    <div className="logo-container">
                        <img src={logo} alt="Forkify Logo" className="logo-img" />
                        <h1 className="logo-text">Forkify Admin</h1>
                    </div>
                    <h1 className="page-title">Admin User Management</h1>
                </div>

                {/* Admin User Management Section */}
                <div className="settings-grid">
                    <div className="settings-card">
                        <h2>Manage Admin Users</h2>
                        <p>View and manage admin users, their roles, and permissions.</p>
                        <Link to="/admin/settings/users">
                            <button className="settings-btn">View Users</button>
                        </Link>

                        <h3>Users List</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button className="settings-btn">Edit</button>
                                            <button className="settings-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default AdminUserManagement;
