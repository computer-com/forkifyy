import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/OwnerDashboard.css";

const OwnerHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/restaurants");
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError("Failed to load restaurants. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className={`owner-home-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="main-content">
        <div className="top-bar">
          <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={30} color="#FF8303" />
          </div>
          <div className="logo-container">
            <img src={logo} alt="Forkify Logo" className="logo-img" />
            <h1 className="logo-text">Forkify Owner</h1>
          </div>
          <h1 className="page-title">Owner Dashboard</h1>
        </div>
        <div className="content-section">
          <h2>Your Restaurants</h2>
          {error && <p className="error">{error}</p>}
          {restaurants.length === 0 && !error ? (
            <p>No restaurants found.</p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <div key={restaurant._id} className="restaurant-card">
                  <h3>{restaurant.name}</h3>
                  <p>Cuisine: {restaurant.cuisine}</p>
                  <p>City: {restaurant.city}</p>
                  {/* Removed the View Details button */}
                </div>
              ))}
            </div>
          )}
          <div className="add-restaurant-container">
            <Link to="/owner/add-restaurant" className="dashboard-btn">
              Add New Restaurant
            </Link>
          </div>
        </div>
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerHome;