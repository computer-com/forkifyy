import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/UserCSS/style.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Carousel } from "react-bootstrap"; 
import userLogo from "../../assets/images/user_logo.png";
import adminLogo from "../../assets/images/admin_logo.png";
import Login1 from "../../assets/images/Login1.jpg";
import Login2 from "../../assets/images/Login2.jpg";


const LoginOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); // Initialize the navigation function

  const handleContinue = () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }
    if (selectedOption === "user") {
      navigate("/signin"); // Navigate to the SignIn page
    } else if (selectedOption === "admin") {
      navigate("/adminoptions"); // Navigate to the AdminOptions page
    }
  };

  return (
    <div className="login-container">
      {/* Selection Box */}
      <div className="selection-box">
        <h2>Choose any one between</h2>
        <h2>User & Admin</h2>
        <div className="options">
          <div
            className={`option ${selectedOption === "user" ? "selected" : ""}`}
            onClick={() => setSelectedOption("user")}
          >
            <img src={userLogo} alt="User" />
            <p>User</p>
          </div>
          <div
            className={`option ${selectedOption === "admin" ? "selected" : ""}`}
            onClick={() => setSelectedOption("admin")}
          >
            <img src={adminLogo} alt="Admin" />
            <p>Admin</p>
          </div>
        </div>
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>

      {/* Bootstrap Carousel Section */}
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={Login1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Login2} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default LoginOptions;

