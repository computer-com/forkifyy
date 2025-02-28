import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/AdminHome.css';

const AdminHome = () => {
  const location = useLocation();
  const [currentTime] = useState(new Date().toLocaleTimeString());

  const stats = {
    totalOrders: 156,
    revenue: '$8,459',
    customers: 89,
    reservations: 34
  };

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      title: 'New order #1234',
      time: '5 minutes ago',
      icon: 'fas fa-shopping-cart'
    },
    {
      id: 2,
      type: 'reservation',
      title: 'Table #7 reserved',
      time: '15 minutes ago',
      icon: 'fas fa-calendar-check'
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Low stock alert: Wine',
      time: '1 hour ago',
      icon: 'fas fa-exclamation-triangle'
    },
    {
      id: 4,
      type: 'staff',
      title: 'New shift schedule posted',
      time: '2 hours ago',
      icon: 'fas fa-user-clock'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="logo-container">
          <h1>Forkify Admin</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/orders" className={`nav-link ${isActive('/admin/orders')}`}>
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/inventory" className={`nav-link ${isActive('/admin/inventory')}`}>
              <i className="fas fa-box"></i>
              <span>Inventory</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/reservations" className={`nav-link ${isActive('/admin/reservations')}`}>
              <i className="fas fa-calendar-alt"></i>
              <span>Reservations</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/staff" className={`nav-link ${isActive('/admin/staff')}`}>
              <i className="fas fa-users"></i>
              <span>Staff Management</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/menu" className={`nav-link ${isActive('/admin/menu')}`}>
              <i className="fas fa-utensils"></i>
              <span>Menu Management</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/analytics" className={`nav-link ${isActive('/admin/analytics')}`}>
              <i className="fas fa-chart-bar"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/settings" className={`nav-link ${isActive('/admin/settings')}`}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
          </li>
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
          <div className="stat-card">
            <i className="fas fa-shopping-cart"></i>
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-label">Total Orders Today</div>
          </div>
          <div className="stat-card">
            <i className="fas fa-dollar-sign"></i>
            <div className="stat-value">{stats.revenue}</div>
            <div className="stat-label">Today's Revenue</div>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div className="stat-value">{stats.customers}</div>
            <div className="stat-label">Active Customers</div>
          </div>
          <div className="stat-card">
            <i className="fas fa-calendar-check"></i>
            <div className="stat-value">{stats.reservations}</div>
            <div className="stat-label">Today's Reservations</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="action-card">
            <i className="fas fa-plus-circle"></i>
            <h3>New Order</h3>
            <p>Create a new customer order</p>
          </div>
          <div className="action-card">
            <i className="fas fa-calendar-plus"></i>
            <h3>Add Reservation</h3>
            <p>Book a new table reservation</p>
          </div>
          <div className="action-card">
            <i className="fas fa-user-plus"></i>
            <h3>Add Staff</h3>
            <p>Create new staff account</p>
          </div>
          <div className="action-card">
            <i className="fas fa-clipboard-list"></i>
            <h3>Update Menu</h3>
            <p>Modify menu items</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="activity-header">
            <h2>Recent Activity</h2>
            <span>{currentTime}</span>
          </div>
          <ul className="activity-list">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <i className={activity.icon}></i>
                </div>
                <div className="activity-details">
                  <h3 className="activity-title">{activity.title}</h3>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;