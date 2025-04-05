import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/OwnerCSS/OwnerFooter.css";

const OwnerFooter = () => {
  return (
    <footer id="owner-footer">
      <div id="footer-container">
        <div className="footer-column">
          <h4>Owner Tools</h4>
          <Link to="/owner/dashboard">Overview</Link>
          <Link to="/owner/performance">Compare Restaurants</Link>
          <Link to="/owner/reports">Manager Reports</Link>
        </div>

        <div className="footer-column">
          <h4>Business</h4>
          <Link to="/partnerships">Partnerships</Link>
          <Link to="/investors">Investors</Link>
          <Link to="/insights">Insights</Link>
        </div>

        <div className="footer-column">
          <h4>Forkify</h4>
          <Link to="/about">About Us</Link>
          <Link to="/owner/support">Contact</Link>
          <Link to="/career">Career</Link>
        </div>
      </div>
    </footer>
  );
};

export default OwnerFooter;
