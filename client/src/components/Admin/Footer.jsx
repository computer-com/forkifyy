import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/AdminCSS/Footer.css";

const Footer = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">
        <div className="admin-footer-column">
          <h3>Discover</h3>
          <Link to="/admin/reservations">Edit Reservations</Link>
          <Link to="/admin/stats">Sales Report</Link>
          <Link to="/admin/inventory">Manage Inventory</Link>
        </div>
        <div className="admin-footer-column">
          <h3>Forkify</h3>
          <Link to="/about">About Us</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/career">Career</Link>
        </div>
        <div className="admin-footer-column">
          <h3>More</h3>
          <Link to="/trust">Trust Center</Link>
          <Link to="/security">Security</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>
        <div className="admin-footer-column">
          <h3>Business</h3>
          <Link to="/partnerships">Partnerships</Link>
          <Link to="/owners">Business Owners</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;