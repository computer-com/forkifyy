import React, { useState, useRef } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi"; // FIXED: Added missing icon
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/OwnerPerformance.css";

const OwnerPerformance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const feedbackRef = useRef(null);

  const managerStats = [
    { name: "Arjun Patel", restaurant: "Choice", role: "General Manager", sales: 5000, inventory: "92%" },
    { name: "Maya Desai", restaurant: "Spice Junction", role: "Inventory Manager", sales: 3800, inventory: "94%" },
    { name: "Rahul Sharma", restaurant: "Grill House", role: "Operations Lead", sales: 7200, inventory: "89%" }
  ];

  const feedback = [
    { restaurant: "Choice", rating: 4.5, review: "Amazing service and fresh food!" },
    { restaurant: "Grill House", rating: 4.0, review: "Quick delivery, clean and hot food." },
    { restaurant: "Spice Junction", rating: 3.8, review: "Could improve on wait times." },
    { restaurant: "Choice", rating: 4.7, review: "The ambiance was excellent and staff super polite!" },
    { restaurant: "Grill House", rating: 4.2, review: "Good variety of dishes and prompt service." },
    { restaurant: "Spice Junction", rating: 3.9, review: "Average food but excellent cleanliness." }
  ];

  const scrollCarousel = (direction) => {
    const scrollAmount = 340 * 3; // 3 cards width
    if (feedbackRef.current) {
      feedbackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Owner</h1>
        </div>
      </div>

      <div className="main-content">
        <h1 className="page-title">Performance Overview</h1>

        {/* Charts Placeholder */}
        <div className="charts-section">
          <div className="chart-card">
            <h2 style={{ textAlign: "center", color: "#FF8303" }}>Bar Chart</h2>
            <p style={{ textAlign: "center", color: "#aaa" }}>Sales Performance Placeholder</p>
          </div>
          <div className="chart-card">
            <h2 style={{ textAlign: "center", color: "#FF8303" }}>Line Chart</h2>
            <p style={{ textAlign: "center", color: "#aaa" }}>Inventory Accuracy Placeholder</p>
          </div>
        </div>

        {/* Manager Cards */}
        <div className="managers-section">
          <h2>Manager Performance</h2>
          <div className="manager-cards">
            {managerStats.map((mgr, index) => (
              <div className="manager-card" key={index}>
                <h3>{mgr.name}</h3>
                <p><strong>Restaurant:</strong> {mgr.restaurant}</p>
                <p><strong>Role:</strong> {mgr.role}</p>
                <p><strong>Sales:</strong> ${mgr.sales}</p>
                <p><strong>Inventory Accuracy:</strong> {mgr.inventory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Feedback Carousel */}
        <div className="feedback-section">
          <h2>Customer Feedback</h2>
          <div className="carousel-controls">
            <button className="scroll-btn" onClick={() => scrollCarousel("left")}><FaChevronLeft /></button>
            <button className="scroll-btn" onClick={() => scrollCarousel("right")}><FaChevronRight /></button>
          </div>

          <div className="feedback-carousel-wrapper">
            <div className="feedback-carousel" ref={feedbackRef}>
              {feedback.map((fb, index) => (
                <div className="feedback-card-carousel" key={index}>
                  <h4>{fb.restaurant}</h4>
                  <p><strong>Rating:</strong> ⭐ {fb.rating}</p>
                  <p>"{fb.review.slice(0, 60)}..."</p>
                  <button className="see-more-btn" onClick={() => setSelectedReview(fb)}>See More</button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {selectedReview && (
            <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{selectedReview.restaurant}</h3>
                  <FiX className="close-icon" onClick={() => setSelectedReview(null)} />
                </div>
                <p><strong>Rating:</strong> ⭐ {selectedReview.rating}</p>
                <p>{selectedReview.review}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <OwnerFooter />
    </div>
  );
};

export default OwnerPerformance;
