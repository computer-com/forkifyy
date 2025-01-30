import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import googleLogo from "../assets/images/google.png";
import appleLogo from "../assets/images/apple.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';
    
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      navigate('/userhome');
    }
  };

  return (
    <div className="container">
      <div className="selection-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">Login</button>

          <div className="alternative-login">
            <p>Or login with</p>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
