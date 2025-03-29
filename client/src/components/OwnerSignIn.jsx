import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import ownerSignIn1 from "../assets/images/ownerSignIn1.jpg";
import ownerSignIn2 from "../assets/images/ownerSignIn2.jpg";

const OwnerSignIn = () => {
  const navigate = useNavigate();

  // Hardcoded Owner Credentials
  const AUTH_OWNER = {
    email: "examplexyz@example.com",
    password: "123",
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return setError("Both email and password are required.");
    }

    if (
      email === AUTH_OWNER.email &&
      password === AUTH_OWNER.password
    ) {
      localStorage.setItem("owner", JSON.stringify({ email }));
      navigate('/owner/dashboard');
    } else {
      setError("Invalid Email or Password.");
    }
  };

  return (
    <div className="admin-container">
      <div className="selection-box">
        <h2>Owner Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="examplexyz@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="submit-btn">Sign In</button>
        </form>
      </div>

      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={ownerSignIn1} alt="Slide 1" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={ownerSignIn2} alt="Slide 2" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default OwnerSignIn;
