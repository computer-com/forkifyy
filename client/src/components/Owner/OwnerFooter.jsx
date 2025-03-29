import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/OwnerCSS/OwnerFooter.css";

const OwnerFooter = () => {
  return (
    <footer className="owner-footer">
      <div className="footer-container">

        <div className="footer-column">
          <h4>Owner Tools</h4>
          <Link to="/overview">Overview</Link>
          <Link to="/compare-restaurant">Compare Restaurants</Link>
          <Link to="/owner/reports">Manager Reports</Link>
          <p></p>
        </div>

        {/* Business Section */}
        <div className="footer-column">
           <h3>Business</h3>
           <Link to="/partnerships">Partnerships</Link>
           <Link to="/investors">Investors</Link>
           <Link to="/insights">Insights</Link>
        </div>
        
        {/* Forkify Section */}
        <div className="footer-column">
          <h3>Forkify</h3>
          <Link to="/about">About Us</Link>
          <Link to="/owner/support">Contact</Link>
          <Link to="/career">Career</Link>
        </div>

      </div>
    </footer>
  );
};

export default OwnerFooter;
