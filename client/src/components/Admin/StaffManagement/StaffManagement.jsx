import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "../../../assets/css/AdminCSS/Staff.css";
import logo from "../../../assets/images/Forkify_Logo.png";
import Sidebar from "../../Admin/Sidebar";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/Footer.css";
import { FiMenu } from "react-icons/fi"; 

const StaffManagement = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", contact: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  // Fetch Staff Data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/staff")
      .then((response) => setStaff(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  // Delete Staff Member
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/staff/${id}`)
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
        .post("http://localhost:5000/api/staff", newStaff)
        .then((response) => {
          setStaff([...staff, response.data]);
          setNewStaff({ name: "", role: "", contact: "" });
        })
        .catch((error) => console.error("Error adding staff:", error));
    } else {
      alert("All fields are required!");
    }
  };

  // Function to refresh the page when clicking the logo
  const handleRefresh = () => {
    navigate("/AdminHome");
    window.location.reload();
  };

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

      {/* Top Bar with Menu Icon, Logo, and Title */}
      <div className="top-bar">
        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>

        {/* Logo (Refreshes Page) */}
        <div className="logo-container" onClick={handleRefresh} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Admin</h1>
        </div>

        {/* Title in the center */}
        <h1 className="page-title">Staff Management</h1>
      </div>

      <div className="main-content">
        {/* Staff Management Layout */}
        <div className="staff-management-container">
          {/* Staff Form - Placed on Left */}
          <div className="staff-form-container">
            <h2>Add New Staff Member</h2>
            <input type="text" name="name" placeholder="Name" value={newStaff.name} onChange={handleChange} />
            <input type="text" name="role" placeholder="Role" value={newStaff.role} onChange={handleChange} />
            <input type="text" name="contact" placeholder="Contact" value={newStaff.contact} onChange={handleChange} />
            <button onClick={handleAddStaff} className="dashboard-btn">Add Staff</button>
          </div>
          

          {/* Staff List */}
          <div className="staff-list">
            {staff.map((member) => (
              <div key={member._id} className="staff-card">
                <h2>{member.name}</h2>
                <p>Role: {member.role}</p>
                <p>Contact: {member.contact}</p>
                <button className="dashboard-btn delete-btn" onClick={() => handleDelete(member._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffManagement;
