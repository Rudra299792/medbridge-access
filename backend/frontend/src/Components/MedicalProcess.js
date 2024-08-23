import React from 'react';
import '../CSS/MedicalProcess.css'; // Updated CSS file name

const MedicalProcess = () => {
  const steps = [
    {
      title: 'Explore',
      description: 'Find and research top hospitals & destinations',
      icon:<img src="icons/search.png" alt="Slide 1" class="" />

    },
    {
      title: 'Quote',
      description: 'Request a quote directly through our website',
      icon:<img src="icons/medical-invoice.png" alt="Slide 1" class="" />, // Replace with medical-related icon
    },
    {
      title: 'Match',
      description: 'Based on your criteria, we recommend the best hospitals or providers',
      icon:<img src="icons/balanced.png" alt="Slide 1" class="" />, // Replace with medical-related icon
    },
    {
      title: 'Arrange',
      description: 'The hospital/provider will contact you directly to coordinate your treatment',
      icon:<img src="icons/networking.png" alt="Slide 1" class="" />, // Replace with medical-related icon
    },
    {
      title: 'Treat',
      description: 'Finalize your treatment with the hospital/provider of your choice',
      icon:<img src="icons/first-aid-kit.png" alt="Slide 1" class="" />, // Replace with medical-related icon
    },
  ];

  return (
    <div className="medical-process">
      <h2 className="process-heading">The Simplest Process in Finding Healthcare Abroad</h2>
      <p className="process-subheading">We'll Help You Map Out Your Medical Tourism Journey</p>
      <div className="medical-steps">
        {steps.map((step, index) => (
          <div key={index} className="medical-step">
            <div className="medical-icon">{step.icon}</div>
            <h3 className="medical-title">{step.title}</h3>
            <p className="medical-description">{step.description}</p>
          </div>
        ))}
      </div>
      <button className="medical-quote-button">Request a Quote for Healthcare Now</button>
    </div>
  );
};

export default MedicalProcess;
