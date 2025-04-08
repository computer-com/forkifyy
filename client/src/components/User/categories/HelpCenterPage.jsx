import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/forkify_logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const HelpCenterPage = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title">Help Center</h1>

      <section className="page-content">
        <p>Welcome to the ForkiFy Help Center. Here, you will find solutions to common issues and helpful guides to enhance your experience with us.</p>
        <ul>
          <li><strong>How to make a reservation</strong></li>
          <li><strong>How to use the ForkiFy app</strong></li>
          <li><strong>Payment methods</strong></li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;
