// PasswordSettings.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { FiMenu } from 'react-icons/fi';
import logo from '../../../assets/images/Forkify_Logo.png';
import '../../../assets/css/AdminCSS/Settings.css';

const PasswordSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage('New passwords do not match.');
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put('http://localhost:5000/api/settings/password', {
        currentPassword,
        newPassword,
      }, {
        headers: {
            Authorization: `Bearer ${token}`  // Optional if using JWT
        }
        
      });

      if (response.data.success) {
        setMessage('Password updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(response.data.message || 'Failed to update password.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className={`settings-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <div className="top-bar">
          <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={30} color="#FF8303" />
          </div>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <h1 className="logo-text">Forkify Admin</h1>
          </div>
          <h1 className="page-title">Change Password</h1>
        </div>

        <div className="settings-grid">
          <form onSubmit={handlePasswordChange} className="settings-card" style={{ width: '100%' }}>
            <h2>Update Your Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
            />

            <button type="submit" className="settings-btn">Update Password</button>

            {message && <p style={{ marginTop: '10px', color: '#FF8303' }}>{message}</p>}
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PasswordSettings;
