import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import adminSignIn1 from "../assets/images/adminSignIn1.jpg";
import adminSignIn2 from "../assets/images/adminSignIn2.jpg";
import axios from "axios";

const ManagerSignIn = () => {
  const navigate = useNavigate();

  //Hardcoded Authorized Credentials for Manager
  const AUTHORIZED_MANAGER = {
    id: "vic",
    password: "4567",
  };

  // State for Form Inputs
  const [credentials, setCredentials] = useState({
    managerId: "",
    password: "",
  });
  
  // State for Error Messages
  const [error, setError] = useState("");

  //Handle Input Changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if Entered Credentials Match Hardcoded Credentials
    if (
      credentials.managerId === AUTHORIZED_MANAGER.id &&
      credentials.password === AUTHORIZED_MANAGER.password
    ) {
      // Redirect to Admin Dashboard (Manager Home)
      navigate('/AdminHome');
    } else {
      // Display Error Message
      setError("Invalid Manager ID or Password! Please try again.");
    }
  };

  return (
    <div className="admin-container">
      <div className="selection-box">
        <h2>Manager Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="managerId">Manager ID</label>
            <input
              type="text"
              id="managerId"
              name="managerId"
              placeholder="Enter your Manager ID"
              value={credentials.managerId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="submit-btn">Sign In</button>
        </form>
      </div>

      {/* Bootstrap Carousel for Images */}
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={adminSignIn1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={adminSignIn2} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default ManagerSignIn;
