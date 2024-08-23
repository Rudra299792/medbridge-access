import React from 'react';
import '../CSS/MedicalTourismOptions.css';

const MedicalTourismOptions = () => {
  return (
    <div className="medical-tourism-container">
      <div className="medical-tourism-header">
        <h2>Easy Access to Options Around the World</h2>
      </div>
      <div className="medical-tourism-content">
        <div className="medical-tourism-image-section">
          <img src="banner/banner4.jpeg" alt="Person with arms raised" />
        </div>
        <div className="medical-tourism-info-section">
          <div className="medical-tourism-info-box">
            <p>
              MedicalTourism.com has a list of providers from all over the world. Click the button below to get started and browse providers.
            </p>
            <button>Find Providers</button>
          </div>
          <div className="medical-tourism-info-box">
            <p>
              Interested in a particular destination? Check out our destination guides with detailed information: from tourist attractions, restaurants, and hotels to top-ranked healthcare providers and doctors.
            </p>
            <button>Destination Guides</button>
          </div>
          <div className="medical-tourism-info-box">
            <p>
              Looking for a specific treatment? Check out our list of up to 1,000 available treatments all over the world.
            </p>
            <button>Explore Treatments</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalTourismOptions;
