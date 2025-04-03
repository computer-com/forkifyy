import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/Forkify_Logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const DineIn = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title">Dine-In</h1>
      <section className="page-content">
        <p>Explore dine-in options at the best restaurants. Enjoy a fine dining experience in a cozy atmosphere with a variety of food choices.</p>
        <button onClick={() => window.location.href='/UserHome'}>Go to Restaurant Home</button>
      </section>

      <Footer />
    </div>
  );
};

export default DineIn;
