import React, { useState, useEffect } from "react";
import "../../assets/css/adminhome.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Forkify_Logo.png";
import axios from "axios";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    customers: 0,
    reservations: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Fetch Dashboard Statistics
  useEffect(() => {
    axios.get("http://localhost:5000/api/stats") // Make sure backend has this endpoint
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error("Error fetching statistics:", error));

    axios.get("http://localhost:5000/api/recent-activity") // Fetch recent logs
      .then(response => {
        setRecentActivity(response.data);
      })
      .catch(error => console.error("Error fetching recent activity:", error));
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="logo-container">
          <h1>Forkify Admin</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-item"><Link to="/admin" className="nav-link">Dashboard</Link></li>
          <li className="nav-item"><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li className="nav-item"><Link to="/admin/inventory" className="nav-link">Inventory</Link></li>
          <li className="nav-item"><Link to="/admin/reservations" className="nav-link">Reservations</Link></li>
          <li className="nav-item"><Link to="/admin/staff" className="nav-link">Staff Management</Link></li>
          <li className="nav-item"><Link to="/admin/menu" className="nav-link">Menu Management</Link></li>
          <li className="nav-item"><Link to="/admin/stats" className="nav-link">Analytics</Link></li>
          <li className="nav-item"><Link to="/admin/settings" className="nav-link">Settings</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-title">
            <h1>Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <i className="fas fa-bell"></i> Notifications
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> New Order
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <div className="stat-card"><h3>Total Orders</h3><p>{stats.totalOrders}</p></div>
          <div className="stat-card"><h3>Total Revenue</h3><p>${stats.revenue}</p></div>
          <div className="stat-card"><h3>Active Customers</h3><p>{stats.customers}</p></div>
          <div className="stat-card"><h3>Today's Reservations</h3><p>{stats.reservations}</p></div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="action-card"><h3>New Order</h3><p>Create a new customer order</p></div>
          <div className="action-card"><h3>Add Reservation</h3><p>Book a new table reservation</p></div>
          <div className="action-card"><h3>Add Staff</h3><p>Create new staff account</p></div>
          <div className="action-card"><h3>Update Menu</h3><p>Modify menu items</p></div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.length > 0 ? (
              recentActivity.map(activity => (
                <li key={activity._id}>
                  <p>{activity.description} - <span>{new Date(activity.timestamp).toLocaleTimeString()}</span></p>
                </li>
              ))
            ) : (
              <p>No recent activity available.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
