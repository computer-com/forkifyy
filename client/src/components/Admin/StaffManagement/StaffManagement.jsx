import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../assets/css/adminhome.css"; // Ensure styles are consistent
import logo from "../../../assets/images/Forkify_Logo.png";

// Sample Initial Data
const initialStaff = [
  { id: 1, name: "John Doe", role: "Chef", contact: "123-456-7890" },
  { id: 2, name: "Jane Smith", role: "Waiter", contact: "987-654-3210" }
];

const StaffManagement = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", contact: "" });

    // Fetch Staff Data from MongoDB when the component loads
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/staff") // Adjusted to match your server port
        .then((response) => setStaff(response.data))
        .catch((error) => console.error("Error fetching staff:", error));
    }, []);

   // Delete Staff Member (DELETE Request)
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

   // Add New Staff Member (POST Request)
   const handleAddStaff = () => {
    if (newStaff.name && newStaff.role && newStaff.contact) {
      axios
        .post("http://localhost:5000/api/staff", newStaff)
        .then((response) => {
          setStaff([...staff, response.data]); // Add to state
          setNewStaff({ name: "", role: "", contact: "" }); // Reset Form
        })
        .catch((error) => console.error("Error adding staff:", error));
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="staff-page">
      {/* Header Section */}
      <div className="top-bar">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="logo-text">ForkiFy</span>
        </div>
        <h1 className="site-title">Staff Management</h1>
      </div>

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

        {/* Staff List - Aligned on Right in 3x3 Grid */}
        <div className="staff-list">
          {staff.map((member) => (
            <div key={member._id} className="staff-card">
              <h2>{member.name}</h2>
              <p>Role: {member.role}</p>
              <p>Contact: {member.contact}</p>
              <button className="dashboard-btn" onClick={() => handleDelete(member._id)}>Delete</button>
            </div>
          ))}
        </div>

      </div>

      {/* Back to Dashboard Button */}
      <div className="back-btn-container">
        <Link to="/AdminHome" className="back-btn">Back to Dashboard</Link>
      </div>
    </div>
  );

};

export default StaffManagement;
