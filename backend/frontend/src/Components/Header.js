// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';

const Header = () => {
  return (
    <header className="header">
    <div className="header-strip">
      <p>Phone: +91 8527032951 * Email: absc@gmail.com * Time: 10:00AM-5:00PM</p>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
    <div className="header-container">
      <div className='logo-box' >
      <img src='/icons/logo.png' alt='Medbridge-access-logo' className="Medbridge-access-logo" />
      <div className="logo">
        <h1><span className="title-we">Med</span>
        <div className="title-2"><span>Bridge</span> <span>Access</span></div>
        </h1>
      </div>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/medicaltourism">Medical Tourism</Link>
        <Link to="/foundermessage">Founders Message</Link>

      </nav>
      <Link to="/bookappointment">
        <button className="quote-button">Book An Appointment</button>
      </Link>
    </div>
  </header>
  
  );
}

export default Header;
