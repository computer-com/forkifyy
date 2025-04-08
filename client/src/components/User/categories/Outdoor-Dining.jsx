import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/forkify_logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const OutdoorDining = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title">Outdoor Dining</h1>
      <section className="page-content">
        <p>Discover restaurants with the best outdoor seating. Enjoy your meals in the fresh air with scenic views, perfect for a relaxed experience.</p>
        <button onClick={() => window.location.href='/UserHome'}>Go to Restaurant Home</button>
      </section>

      <Footer />
    </div>
  );
};

export default OutdoorDining;
