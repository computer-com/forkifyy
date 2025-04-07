import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/css/AdminCSS/Staff.css";
import logo from "../../assets/images/Forkify_Logo.png";
import Sidebar from "../Admin/Sidebar";
import Footer from "../Admin/Footer";
import { FiMenu } from "react-icons/fi";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", contact: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch Staff Data from API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/staff`)
      .then((response) => setStaff(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  // Delete Staff Member
  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/api/staff/${id}`)
      .then(() => setStaff(staff.filter((member) => member._id !== id)))
      .catch((error) => console.error("Error deleting staff:", error));
  };

  // Handle Input Change
  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  // Add New Staff Member
  const handleAddStaff = () => {
    if (newStaff.name && newStaff.role && newStaff.contact) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/staff`, newStaff)
        .then((response) => {
          setStaff([...staff, response.data]);
          setNewStaff({ name: "", role: "", contact: "" });
        })
        .catch((error) => console.error("Error adding staff:", error));
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="admin-staff-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="admin-staff-top-bar">
        <div className="admin-staff-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="admin-staff-logo-container">
          <a href="/AdminHome">
            <img src={logo} alt="Forkify Logo" className="admin-staff-logo-img" />
          </a>
          <h1 className="admin-staff-logo-text">Forkify Admin</h1>
        </div>
        <h1 className="admin-staff-page-title">Staff Management</h1>
      </div>
      <div className={`admin-staff-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-staff-content-section">
          {/* Staff Management Layout - Unchanged */}
          <div className="staff-management-container">
            {/* Staff Form - Placed on Left */}
            <div className="staff-form-container">
              <h2>Add New Staff Member</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newStaff.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newStaff.role}
                onChange={handleChange}
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={newStaff.contact}
                onChange={handleChange}
              />
              <button onClick={handleAddStaff} className="dashboard-btn">
                Add Staff
              </button>
            </div>

            {/* Staff List */}
            <div className="staff-list">
              {staff.map((member) => (
                <div key={member._id} className="staff-card">
                  <h2>{member.name}</h2>
                  <p>Role: {member.role}</p>
                  <p>Contact: {member.contact}</p>
                  <button
                    className="dashboard-btn delete-btn"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="admin-staff-footer">
        <Footer />
      </div>
    </div>
  );
};

export default StaffManagement;