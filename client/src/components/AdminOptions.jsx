import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import managerLogo from "../assets/images/manager_logo.png";
import ownerLogo from "../assets/images/owner_logo.png";
const AdminOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const handleContinue = () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }
    navigate("/adminsignin");
  };

  return (
    <div className="container">
      <div className="selection-box">
        <h2>Choose any one between </h2>
        <h2>Manager & Owner</h2>
        <div className="options">
          <div
            className={`option ${selectedOption === "manager" ? "selected" : ""}`}
            onClick={() => setSelectedOption("manager")}
          >
            <img src={managerLogo} alt="Manager Icon" />
            <p>Manager</p>
          </div>
          <div
            className={`option ${selectedOption === "owner" ? "selected" : ""}`}
            onClick={() => setSelectedOption("owner")}
          >
            <img src={ownerLogo} alt="Owner Icon" />
            <p>Owner</p>
          </div>
        </div>
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AdminOptions;