import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/OwnerSupport.css";

const OwnerSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    { question: "How can I reset my owner password?", answer: "Go to the Change Password section under Settings." },
    { question: "Where can I view my invoices?", answer: "Check Billing & Subscriptions under the Settings page." },
    { question: "How do I contact my assigned account manager?", answer: "You can reach out via the Manager Reports section or through the contact form below." },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className={`owner-support-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <div className="top-bar">
          <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={30} color="#FF8303" />
          </div>
          <div className="logo-container">
            <img src={logo} alt="Forkify Logo" className="logo-img" />
            <h1 className="logo-text">Forkify Owner</h1>
          </div>
          <h1 className="page-title">Support</h1>
        </div>

        <div className="support-section">
          <h2>Need Help?</h2>
          <p className="support-desc">We're here to support your restaurant success. Reach out to our help desk or explore FAQs below.</p>

          <div className="support-grid">
            {/* Contact Form */}
            <div className="support-card">
              <h3>Contact Support</h3>
              <form className="support-form">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <textarea placeholder="How can we help you?" rows="5" required></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>

            {/* Categories */}
            <div className="support-card">
              <h3>Support Categories</h3>
              <ul className="category-list">
                <li>Account & Login Issues</li>
                <li>Billing & Subscriptions</li>
                <li>Restaurant Setup</li>
                <li>Manager Access</li>
                <li>Technical Support</li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${activeFAQ === index ? "active" : ""}`}
                key={index}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">{faq.question}</div>
                {activeFAQ === index && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>

        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerSupport;
