import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/Forkify_Logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const FAQPage = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title">FAQs</h1>
      <section className="page-content">
        <p>Here are some frequently asked questions to help you navigate through ForkiFy. If you have more questions, feel free to reach out to us.</p>
        <ul>
          <li><strong>How do I make a reservation?</strong> You can reserve a table by selecting a restaurant and picking your preferred time.</li>
          <li><strong>Is ForkiFy free to use?</strong> Yes, ForkiFy is completely free to use for users.</li>
          <li><strong>How do I make a reservation?</strong> Simply go to a restaurant page, select a time slot, and fill in your details to book.</li>
          <li><strong>How do I cancel my reservation?</strong> You can cancel your reservation from the "My Reservations" section in your profile.</li>
          <li><strong>What payment methods do you accept?</strong> Yes, ForkiFy is completely free to use for users.</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
