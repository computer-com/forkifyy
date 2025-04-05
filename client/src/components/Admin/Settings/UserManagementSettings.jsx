import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { FiMenu } from "react-icons/fi";
import logo from "../../../assets/images/Forkify_Logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/AdminUserManagement.css";

const AdminUserManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for admin users
    const users = [
        { id: 1, name: "John Doe", role: "Admin" },
        { id: 2, name: "Jane Smith", role: "Manager" },
    ];

    return (
        <div className="admin-user-container">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <div className="admin-user-top-bar">
                <div className="admin-user-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <FiMenu size={30} color="#FF8303" />
                </div>
                <div className="admin-user-logo-container">
                    <img src={logo} alt="Forkify Logo" className="admin-user-logo-img" />
                    <h1 className="admin-user-logo-text">Forkify Admin</h1>
                </div>
                <h1 className="admin-user-page-title">Admin User Management</h1>
            </div>

            <div className={`admin-user-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
                <div className="admin-user-content-section">
                    <div className="user-management-card">
                        <h2>Manage Admin Users</h2>
                        <p>View and manage admin users, their roles, and permissions.</p>
                        <Link to="/admin/settings/users">
                            <button className="dashboard-btn">View Users</button>
                        </Link>

                        <h3>Users List</h3>
                        <table className="users-table">
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
                                            <button className="dashboard-btn">Edit</button>
                                            <button className="dashboard-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="admin-user-footer">
                <Footer />
            </div>
        </div>
    );
};

export default AdminUserManagement;