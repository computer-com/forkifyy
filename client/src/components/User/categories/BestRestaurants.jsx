import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/Forkify_Logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const BestRestaurants = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title">Best Restaurants</h1>
      <section className="page-content">
        <p>Explore the top-rated restaurants in your area, offering the best dining experiences. From exquisite cuisine to elegant dining spaces, we’ve got you covered.</p>
        <button onClick={() => window.location.href='/UserHome'}>Go to Restaurant Home</button>
      </section>

      <Footer />
    </div>
  );
};

export default BestRestaurants;
