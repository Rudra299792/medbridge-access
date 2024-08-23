import React from 'react';
import '../CSS/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="senior-care-container">
      <div className="senior-care-image">
        <img src="banner/banner2.jpeg" alt="Nurse with Senior" />
        <div className="play-button">
          <button>&#9654;</button>
        </div>
      </div>
      <div className="senior-care-content">
        <h2>Welcome to MedBridge Access</h2>
        <h1>Your Gateway to Premium Medical Tourism & Virtual Consultation</h1>
        <p>
          Explore a world where health and travel meet. MedBridge Access is dedicated to providing top-tier medical tourism services alongside virtual consultations for second opinions, ensuring you have the best care possible wherever you are.
        </p>
        <div className="container">
          <div className="list-column">
            <ul>
              <li>Access to world-class healthcare facilities</li>
              <li>Personalized care plans</li>
              <li>Seamless travel and medical arrangements</li>
            </ul>
          </div>
          <div className="list-column">
            <ul>
              <li>Expert second opinions from renowned specialists</li>
              <li>Comprehensive follow-up care</li>
              <li>Ease of access with a state-of-the-art virtual environment integration</li>
            </ul>
          </div>
        </div>
        <div className="senior-care-features">
          <div className="feature">
            <span className="icon"><i className="fa-solid fa-user-nurse"></i></span>
            <span>Expert Nursing Staff</span>
          </div>
          <div className="feature">
            <span className="icon"><i className="fa-solid fa-heart-pulse"></i></span>
            <span>Safe Solution For Health</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
