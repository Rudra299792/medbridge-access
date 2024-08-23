import React from 'react';
import '../CSS/MedicalTourismBanner.css'; // You can style this component using CSS

const MedicalTourismBanner = () => {
  return (
    <div className="medical-tourism-banner-container">
      <div className="medical-tourism-card providers-card">
        <div className="medical-tourism-banner-image-container">
    <img src="banner/mt1.jfif" alt="Better Medical Tourism Association" className="" />
    <div className="medical-tourism-banner-overlay"></div>
  </div>         
  <div className="medical-tourism-banner-content">

   <h2 className="medical-tourism-banner-title">Global Healthcare Access Made Simple & Affordable</h2>
          <p className="medical-tourism-banner-description">
          MedBridge Access offers a comprehensive platform for medical tourists, providing tailored travel packages, easy payment solutions, and a network of trusted healthcare professionals. Enjoy peace of mind on your healthcare journey.          </p>
          <button className="medical-tourism-banner-learn-more-btn">Learn More →</button>
        </div>
      </div>

      <div className="medical-tourism-card patients-card">
        <div className="medical-tourism-banner-image-container">
    <img src="banner/mt2.jfif" alt="Better Medical Tourism Association" className="" />
    <div className="medical-tourism-banner-overlay"></div>
  </div> 
  <div className="medical-tourism-banner-content">

            <h2 className="medical-tourism-banner-title">Healthcare for Everyone, Everywhere</h2>
          <ul className="medical-tourism-banner-features-list">
            <li>Healthcare for every budget</li>
            <li>Completely free consultations</li>
            <li>No commitment required</li>
          </ul>
          <button className="medical-tourism-banner-get-quote-btn">Get a Free Quote →</button>
        </div>
      </div>
    </div>
  );
};

export default MedicalTourismBanner;
