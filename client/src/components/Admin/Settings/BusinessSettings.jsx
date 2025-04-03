import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../Sidebar";
import logo from "../../../assets/images/Forkify_Logo.png";
import Footer from "../Footer";
import "../../../assets/css/AdminCSS/BuisnessSetting.css";

const BusinessInfo = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state
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
        <div className={`settings-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FiMenu size={30} color="#FF8303" />
                    </div>

                    <div className="logo-container">
                        <img src={logo} alt="Forkify Logo" className="logo-img" />
                        <h1 className="logo-text">Forkify Admin</h1>
                    </div>
                    <h1 className="page-title">Business Information</h1>
                </div>

                {/* Business Info Form */}
                <div className="settings-grid">
                    <div className="settings-card">
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

                            <button type="submit" className="settings-btn">Update Business Info</button>
                        </form>
                    </div>
                </div>
                {/* Footer */}
                <Footer />
            </div>
        </div>
        
    );
};

export default BusinessInfo;
