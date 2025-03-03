import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Carousel } from "react-bootstrap"; 
import ownerSignIn1 from "../assets/images/ownerSignIn1.jpg";
import ownerSignIn2 from "../assets/images/ownerSignIn2.jpg";

const OwnerSignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
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
    
    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email';
    }

    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      navigate('/owner/dashboard'); // Navigate to Owner Dashboard
    }
  };

  return (
    <div className="admin-container">
      <div className="selection-box">
        <h2>Owner Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Carousel */}
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={ownerSignIn1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={ownerSignIn2} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default OwnerSignIn;
