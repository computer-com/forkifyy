import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { FiMenu } from 'react-icons/fi';
import logo from '../../../assets/images/Forkify_Logo.png';
import '../../../assets/css/AdminCSS/AdminPasswordSetting.css';

const PasswordSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/settings/password`, {
        currentPassword,
        newPassword,
      }, {
        headers: {
            Authorization: `Bearer ${token}`
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
    <div className="admin-password-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="admin-password-top-bar">
        <div className="admin-password-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="admin-password-logo-container">
          <img src={logo} alt="Forkify Logo" className="admin-password-logo-img" />
          <h1 className="admin-password-logo-text">Forkify Admin</h1>
        </div>
        <h1 className="admin-password-page-title">Change Password</h1>
      </div>

      <div className={`admin-password-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-password-content-section">
          <form onSubmit={handlePasswordChange} className="password-form-container">
            <h2>Update Your Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="dashboard-btn">Update Password</button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>

      <div className="admin-password-footer">
        <Footer />
      </div>
    </div>
  );
};

export default PasswordSettings;