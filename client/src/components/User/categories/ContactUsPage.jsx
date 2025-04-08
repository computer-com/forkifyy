import React from "react";
import Footer from "../../User/UserFooter";
import logo from "../../../assets/images/forkify_logo.png"; 
import "../../../assets/css/UserCSS/PageStyles.css";

const ContactUsPage = () => {
  return (
    <div>
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="Forkify Logo" />
          <h2>ForkiFy</h2>
        </div>
      </header>
      <h1 className="title-us">Contact Us</h1>
      <section className="page-content-us">
        <p>If you have any questions or need help, feel free to contact our support team. We're here to help!</p>
        <form>
          <div>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div>
            <textarea placeholder="Your Message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
