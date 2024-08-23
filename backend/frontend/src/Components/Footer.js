import React from 'react';
import '../CSS/Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  const backgroundImage = '/banner/banner3.jpg'; // Path relative to the public folder

  return (
    
    <footer>
        <div  className="footer-header" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',  }}>
    <div className="footer-header-content" >
      <h1>Give Your Loved Ones Quality Care You Can Trust</h1>
      <button className="contact-button">Contact Us Now</button>
    </div>
  </div>
    <div className="footer-box">
<div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text"><span>Senior</span>sy</h1>
          <p>
            Suspendisse congue tincidunt nisi, in eleifend metus placerat eu.
            Nunc eget tristique nisi. Nunc a eros vitae magna bibendum tempus.
            Mauris ipsum enim, sollicitudin sit amet consequat at.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Information</h2>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Get In Touch</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> 99 Roving St., Pku</p>
            <p><i className="fas fa-phone"></i> +123-456-789</p>
            <p><i className="fas fa-envelope"></i> hello@awesomesite.com</p>
          </div>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; Copyright 2024. All Rights Reserved. RomeTheme
      </div>
    </div>
    </div>
    </footer>
  );
}

export default Footer;
