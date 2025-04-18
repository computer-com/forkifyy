// /src/pages/Admin/FooterPages/Blogs.jsx

import React from "react";
import Sidebar from "../../Admin/Sidebar";
import Footer from "../../Admin/Footer";
import logo from "../../../assets/images/forkify_logo.png";
import { FiMenu } from "react-icons/fi";
import "../../../assets/css/AdminCSS/sharedfooterpages.css";

const AboutUs = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container">
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Admin</h1>
        </div>
        <h1 className="page-title">Our Blogs</h1>
      </div>

      <div className="main-content">
        <div className="page-section">
          <h2>Share product updates, team stories, and restaurant success tips.</h2>
          <p>
            ForkiFy is a powerful restaurant management platform built to streamline operations,
            simplify reservations, and offer insights for better decision-making.
          </p>
          <p>
            We empower restaurant owners, managers, and staff with intuitive tools to grow their
            businesses and offer seamless experiences to customers.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
