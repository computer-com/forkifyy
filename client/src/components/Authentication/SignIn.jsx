import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/UserCSS/style.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Carousel } from "react-bootstrap"; 
import appleLogo from "../../assets/images/apple.png";
import Signup1 from "../../assets/images/signup1.jpg";
import Signup2 from "../../assets/images/signup2.jpg";
import googleLogo from "../../assets/images/google.png";

const SignIn = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let validationErrors = {};
    if (!firstName) validationErrors.firstName = 'First name is required';
    if (!lastName) validationErrors.lastName = 'Last name is required';
    if (!email) validationErrors.email = 'Email is required';
    if (!phone) validationErrors.phone = 'Phone number is required';
  
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          countryCode
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return alert(data.message || "Sign In failed");
      }
  
      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("customer", JSON.stringify(data.user));
  
      navigate("/userhome");
    } catch (err) {
      console.error("Sign In failed:", err);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="selection-box">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="phone">Phone</label>
            <div className="phone-input">
              <select
                id="country-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="country-code-selector"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <button type="submit" className="submit-btn">Sign In</button>

          <div className="alternative-login">
            <p>Or sign in with</p>
            <div className="social-logins">
              <button type="button" className="social-btn">
                <img src={googleLogo} alt="Google" />
                Google
              </button>
              
              <button type="button" className="social-btn">
                <img src={appleLogo} alt="Apple" />
                Apple
              </button>
            </div>
            <p className="login-link">
              Do have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
      {/* Right Section: Carousel */}
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={Signup1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Signup2} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default SignIn;
