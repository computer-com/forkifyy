import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/UserCSS/style.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Carousel } from "react-bootstrap"; 
import managerLogo from "../../assets/images/manager_logo.png";
import ownerLogo from "../../assets/images/owner_logo.png";
import Admin1 from "../../assets/images/admin1.jpg";
import Admin2 from "../../assets/images/admin2.jpg";

const AdminOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const handleContinue = () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }
    if (selectedOption === "manager") {
      navigate("/manager/signin");
    } else if (selectedOption === "owner") {
      navigate("/owner/signin");
    }
  };

  return (
    <div className="admin-container">
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
      {/* Bootstrap Carousel Section */}
        <div className="carousel-container">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={Admin1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={Admin2} alt="Second slide" />
            </Carousel.Item>
          </Carousel>
        </div>
    </div>
  );
};

export default AdminOptions;