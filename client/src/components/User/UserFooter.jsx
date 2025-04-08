import React from "react";
import "../../assets/css/UserCSS/UserFooter.css";
import forkifyLogo from "../../assets/images/forkify_logo.png"; 

const Footer = () => {
  return (
    <footer className="forkify-footer">
      <div className="footer-container">
        {/* Forkify Logo Section */}
        <div className="footer-section logo-section">
          <div className="logo-container">
            <img src={forkifyLogo} alt="Forkify Logo" className="footer-logo" />
          </div>
        </div>
        <div className="footer-section">
          <h4 className="title-first">ForkiFy</h4>
          <p className="first-text">Discover the best restaurants and dining experience's near you. Reserve-order-Have fun!</p>
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
        <p className="footer-last">&copy; {new Date().getFullYear()} ForkiFy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
