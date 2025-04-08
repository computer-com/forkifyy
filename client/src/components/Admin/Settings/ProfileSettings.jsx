import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../Sidebar";
import logo from "../../../assets/images/forkify_logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/ProfileManagement.css";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated", userDetails);
  };

  return (
    <div className="admin-profile-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="admin-profile-top-bar">
        <div className="admin-profile-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="admin-profile-logo-container">
          <a href="/AdminHome">
            <img src={logo} alt="Forkify Logo" className="admin-profile-logo-img" />
          </a>
          <h1 className="admin-profile-logo-text">Forkify Admin</h1>
        </div>
        <h1 className="admin-profile-page-title">Profile Management</h1>
      </div>

      <div className={`admin-profile-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-profile-content-section">
          {/* Profile Form */}
          <div className="profile-card">
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              {/* Form Fields */}
              <div className="form-fields">
                {/* Name */}
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    value={userDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={userDetails.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={userDetails.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Bio */}
                <div className="input-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder="Write a short bio..."
                    value={userDetails.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="dashboard-btn">Update Profile</button>
            </form>
          </div>
        </div>
      </div>

      <div className="admin-profile-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;