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
    axios.get("http://localhost:5000/api/stats")
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error("Error fetching statistics:", error));

    axios.get("http://localhost:5000/api/recent-activity")
      .then(response => {
        setRecentActivity(response.data);
      })
      .catch(error => console.error("Error fetching recent activity:", error));
  }, []);

  return (
    <div className="admin-container">
      <nav className="sidebar">
        <div className="logo-container">
          <h1>Forkify Admin</h1>
        </div>
        <ul className="nav-menu">
          <li><Link to="/admin" className="nav-link">Dashboard</Link></li>
          <li><Link to="/admin/orders" className="nav-link">Orders</Link></li>
          <li><Link to="/admin/inventory" className="nav-link">Inventory</Link></li>
          <li><Link to="/admin/reservations" className="nav-link">Reservations</Link></li>
          <li><Link to="/admin/staff" className="nav-link">Staff Management</Link></li>
          <li><Link to="/admin/menu" className="nav-link">Menu Management</Link></li>
          <li><Link to="/admin/stats" className="nav-link">Analytics</Link></li>
          <li><Link to="/admin/settings" className="nav-link">Settings</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><h3>Total Orders</h3><p>{stats.totalOrders}</p></div>
          <div className="stat-card"><h3>Total Revenue</h3><p>${stats.revenue}</p></div>
          <div className="stat-card"><h3>Active Customers</h3><p>{stats.customers}</p></div>
          <div className="stat-card"><h3>Today's Reservations</h3><p>{stats.reservations}</p></div>
        </div>

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
