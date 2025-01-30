import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import userLogo from "../assets/images/user_logo.png";
import adminLogo from "../assets/images/admin_logo.png";

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
    <div className="container">
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
    </div>
  );
};

export default LoginOptions;

