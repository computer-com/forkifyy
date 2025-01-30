import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";

const AdminSignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameId: '',
    role: '',
    email: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    usernameId: '',
    role: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    if (!formData.usernameId) validationErrors.usernameId = 'Username ID is required';
    if (!formData.role) validationErrors.role = 'Role is required';
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email';
    }
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone number is required';
    
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      navigate('/admin/dashboard'); // Adjust this route as needed
    }
  };

  return (
    <div className="container">
      <div className="selection-box">
        <h2>Admin Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="usernameId">Username ID</label>
            <input
              type="text"
              id="usernameId"
              name="usernameId"
              placeholder="Enter your username ID"
              value={formData.usernameId}
              onChange={handleChange}
            />
            {errors.usernameId && <span className="error">{errors.usernameId}</span>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="kitchen">Kitchen Staff</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
