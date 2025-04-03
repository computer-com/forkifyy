import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/Forkify_Logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const Cafes = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title">Cafes</h1>
      <section className="page-content">
        <p>Discover the best cafes around you for a perfect coffee break. Whether you need a quick espresso or a peaceful place to relax, find the best options here.</p>
        <button onClick={() => window.location.href='/UserHome'}>Go to Restaurant Home</button>
      </section>

      <Footer />
    </div>
  );
};

export default Cafes;
