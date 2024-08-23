import React from 'react';
import '../CSS/MedicalProblems.css';

const medicalProblems = [
  {
    country: 'United States',
    issue: 'High Medical Costs',
    icon: '/icons/united-states.png',
    description: 'Medical expenses are very high, leading to significant financial burdens on patients.',
  },
  {
    country: 'India',
    issue: 'Accessibility',
    icon: '/icons/india.png',
    description: 'Many rural areas lack access to quality healthcare facilities and services.',
  },
  {
    country: 'United Kingdom',
    issue: 'Long Wait Times',
    icon: '/icons/uk.png',
    description: 'Patients often face long waiting times for treatments and surgeries.',
  },
  {
    country: 'Nigeria',
    issue: 'Inadequate Infrastructure',
    icon: '/icons/nigeria.png',
    description: 'Healthcare infrastructure is often insufficient, affecting the quality of care.',
  },
  {
    country: 'Brazil',
    issue: 'Health Inequality',
    icon: '/icons/brazil.png',
    description: 'There is a significant disparity in healthcare quality between different regions.',
  },
  {
    country: 'China',
    issue: 'Overcrowded Hospitals',
    icon: '/icons/china.png',
    description: 'Hospitals are often overcrowded, leading to rushed and inadequate care.',
  },
];

const MedicalProblems = () => {
  return (
    <div className="medical-problems" style={{ backgroundImage: `url(icons/medical-problems.png)`}}>
      <div className='medical-problems-overlay'>
      <h1 className="title">Medical Problems by Country</h1>
      <p className="subtitle">Challenges faced in medical treatments across various countries</p>
      <div className="problems-grid">
        {medicalProblems.map((problem, index) => (
          <div key={index} className="problem-card">
            <div className="icon-image"> <img src={problem.icon} alt="Slide 1" class="slide-image" /></div>
            <h2 className="country">{problem.country}</h2>
            <h3 className="issue">{problem.issue}</h3>
            <p className="description">{problem.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MedicalProblems;
