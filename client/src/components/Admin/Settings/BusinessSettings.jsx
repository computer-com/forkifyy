import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../Sidebar";
import logo from "../../../assets/images/forkify_logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/BuisnessSetting.css";

const BusinessInfo = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [businessInfo, setBusinessInfo] = useState({
        name: "",
        hours: "",
        address: "",
        phone: "",
        description: "",
    });

    const handleChange = (e) => {
        setBusinessInfo({
            ...businessInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Business info updated", businessInfo);
    };

    return (
        <div className="admin-business-container">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <div className="admin-business-top-bar">
                <div className="admin-business-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <FiMenu size={30} color="#FF8303" />
                </div>
                <div className="admin-business-logo-container">
                    <img src={logo} alt="Forkify Logo" className="admin-business-logo-img" />
                    <h1 className="admin-business-logo-text">Forkify Admin</h1>
                </div>
                <h1 className="admin-business-page-title">Business Information</h1>
            </div>

            <div className={`admin-business-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
                <div className="admin-business-content-section">
                    <div className="business-form-container">
                        <h2>Update Business Information</h2>
                        <form onSubmit={handleSubmit} className="business-form">
                            <div className="input-group">
                                <label htmlFor="name">Restaurant Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Restaurant Name"
                                    value={businessInfo.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="hours">Business Hours</label>
                                <input
                                    type="text"
                                    id="hours"
                                    name="hours"
                                    placeholder="Enter Business Hours"
                                    value={businessInfo.hours}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={businessInfo.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    value={businessInfo.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="description">Restaurant Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter a brief description"
                                    value={businessInfo.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="dashboard-btn">Update Business Info</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="admin-business-footer">
                <Footer />
            </div>
        </div>
    );
};

export default BusinessInfo;