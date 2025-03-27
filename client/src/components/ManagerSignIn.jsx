import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import adminSignIn1 from "../assets/images/adminSignIn1.jpg";
import adminSignIn2 from "../assets/images/adminSignIn2.jpg";

const user = JSON.parse(localStorage.getItem("user"));
console.log("Logged-in user ID:", user?._id);

const ManagerSignIn = () => {
  const navigate = useNavigate();

  // Form state
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Error state
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));

      if (user && user.role === "admin") {
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/AdminHome");
      } else {
        setError("Access Denied: Not an admin.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid Email or Password.");
    }
  };

  return (
    <div className="admin-container">
      <div className="selection-box">
        <h2>Manager Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={credentials.email}
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
