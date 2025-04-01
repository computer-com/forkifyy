import React from "react";
import "../../assets/css/UserCSS/UserFooter.css";

const Footer = () => {
  return (
    <footer className="forkify-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ForkiFy</h4>
          <p>Discover and reserve the best restaurants near you.</p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><a href="/bestrestaurants">Best Restaurants</a></li>
            <li><a href="/cafes">Cafes</a></li>
            <li><a href="/dine-in">Dine-In</a></li>
            <li><a href="/outdoor-dining">Outdoor Dining</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/help">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ForkiFy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
