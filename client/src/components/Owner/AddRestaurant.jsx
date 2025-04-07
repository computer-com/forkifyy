import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/AddRestaurant.css";

const AddRestaurant = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    city: "",
    image: "",
    description: "",
    timeSlots: "",
    managerName: "",
    managerEmail: "",
    managerPassword: "",
    hours: "",
    priceRange: "",
    address: "",
    diningStyle: "",
    dressCode: "",
    parking: "",
    paymentOptions: "",
    chef: "",
    extraInfo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!formData.name) missingFields.push("Name");
    if (!formData.cuisine) missingFields.push("Cuisine");
    if (!formData.city) missingFields.push("City");
    if (!formData.timeSlots) missingFields.push("Time Slots");
    if (!formData.managerName.trim()) missingFields.push("Manager Name");
    if (!formData.managerEmail) missingFields.push("Manager Email");
    if (!formData.managerPassword) missingFields.push("Manager Password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(formData.managerName)) {
      missingFields.push("Manager Name (should not be an email address)");
    }

    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const token = localStorage.getItem("ownerToken");
      if (!token) throw new Error("Please sign in as an owner.");

      console.log("Form data being sent:", formData);
      console.log("Manager Name specifically:", formData.managerName);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/owner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add restaurant");
      }

      navigate("/owner/dashboard");
    } catch (err) {
      console.error("Submission error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="add-restaurant-container">
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="add-restaurant-top-bar">
        <div className="add-restaurant-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="add-restaurant-logo-container">
          <a href="/owner/dashboard">
            <img src={logo} alt="Forkify Logo" className="add-restaurant-logo-img" />
          </a>
          <h1 className="add-restaurant-logo-text">Forkify Owner</h1>
        </div>
        <h1 className="add-restaurant-page-title">Add New Restaurant</h1>
      </div>
      <div className={`add-restaurant-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="add-restaurant-content-section">
          <form onSubmit={handleSubmit} className="add-restaurant-form">
            <h2>Add Restaurant Details</h2>
            <div className="add-restaurant-form-grid">
              <div className="add-restaurant-form-group">
                <label>Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="add-restaurant-form-group">
                <label>Cuisine *</label>
                <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} required />
              </div>
              <div className="add-restaurant-form-group">
                <label>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="add-restaurant-form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Optional" />
              </div>
              <div className="add-restaurant-form-group full-width">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Optional" />
              </div>
              <div className="add-restaurant-form-group full-width">
                <label>Time Slots (comma-separated, e.g., 6:00 p.m., 7:00 p.m.) *</label>
                <input type="text" name="timeSlots" value={formData.timeSlots} onChange={handleChange} required />
              </div>
              <div className="add-restaurant-form-group">
                <label>Hours</label>
                <input type="text" name="hours" value={formData.hours} onChange={handleChange} placeholder="e.g., Mon–Sun 11:00 am–10:00 pm" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Price Range</label>
                <input type="text" name="priceRange" value={formData.priceRange} onChange={handleChange} placeholder="e.g., CAN$21 to CAN$40" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="e.g., 123 Main St" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Dining Style</label>
                <input type="text" name="diningStyle" value={formData.diningStyle} onChange={handleChange} placeholder="e.g., Casual Dining" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Dress Code</label>
                <input type="text" name="dressCode" value={formData.dressCode} onChange={handleChange} placeholder="e.g., Casual" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Parking</label>
                <input type="text" name="parking" value={formData.parking} onChange={handleChange} placeholder="e.g., Street Parking" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Payment Options</label>
                <input type="text" name="paymentOptions" value={formData.paymentOptions} onChange={handleChange} placeholder="e.g., Visa, Mastercard" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Chef</label>
                <input type="text" name="chef" value={formData.chef} onChange={handleChange} placeholder="e.g., Chef John Doe" />
              </div>
              <div className="add-restaurant-form-group full-width">
                <label>Extra Info (comma-separated, e.g., BYO Wine, Gluten-Free)</label>
                <input type="text" name="extraInfo" value={formData.extraInfo} onChange={handleChange} placeholder="Optional" />
              </div>
              <div className="add-restaurant-form-group">
                <label>Manager Name *</label>
                <input type="text" name="managerName" value={formData.managerName} onChange={handleChange} required />
              </div>
              <div className="add-restaurant-form-group">
                <label>Manager Email *</label>
                <input type="email" name="managerEmail" value={formData.managerEmail} onChange={handleChange} required />
              </div>
              <div className="add-restaurant-form-group">
                <label>Manager Password *</label>
                <input type="password" name="managerPassword" value={formData.managerPassword} onChange={handleChange} required />
              </div>
            </div>
            {error && <p className="add-restaurant-error">{error}</p>}
            <button type="submit" className="add-restaurant-submit-btn">Add Restaurant</button>
          </form>
        </div>
      </div>
      <div className="add-restaurant-footer">
        <OwnerFooter />
      </div>
    </div>
  );
};

export default AddRestaurant;