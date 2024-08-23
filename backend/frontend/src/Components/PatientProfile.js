import React from 'react';
import { FaHeart, FaHeartbeat, FaEllipsisV, FaPlus } from 'react-icons/fa';
import '../CSS/PatientProfile.css';

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const PatientProfile = ({ selectedUser }) => {
  // Use a default value or check if the name exists
  const name = selectedUser?.name || 'Unknown';
  const { gender, dob, height, weight, bloodPressure, pulse, problem, medicalHistory, labResults } = selectedUser || {};

  return (
    <div className="patient-profile-container">
      <div className="profile-header">
        <div className="profile-initial">
          {name.charAt(0)}
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{gender}</p>
        </div>
      </div>

      <div className="demographics">
        <div className="demo-row">
          <div className="demo-item">
            <span className="label">DOB</span>
            <span className="value">{dob}</span>
          </div>
          <div className="demo-item">
            <span className="label">Age</span>
            <span className="value">{calculateAge(dob)}</span>
          </div>
        </div>
        <div className="demo-row">
          <div className="demo-item">
            <span className="label">Weight</span>
            <span className="value">{weight}</span>
          </div>
          <div className="demo-item">
            <span className="label">Height</span>
            <span className="value">{height}</span>
          </div>
        </div>
      </div>

      <div className="vitals">
        <div className="vital-card">
          <FaHeart className="icon" />
          <div className="vital-info">
            <h3>Blood Pressure</h3>
            <p>{bloodPressure}</p>
          </div>
        </div>
        <div className="vital-card">
          <FaHeartbeat className="icon" />
          <div className="vital-info">
            <h3>Pulse</h3>
            <p>{pulse} BPM</p>
          </div>
        </div>
      </div>

      <div className="patient-notes">
        <div className="notes-header">
          <h3>Current Problem</h3>
          <div className="notes-actions">
            <FaPlus className="action-icon" />
            <FaEllipsisV className="action-icon" />
          </div>
        </div>
        <div className="notes-content">
          <p className="notes-text">{problem}</p>
        </div>
      </div>

      <div className="patient-notes">
        <div className="notes-header">
          <h3>Medical History</h3>
          <div className="notes-actions">
            <FaPlus className="action-icon" />
            <FaEllipsisV className="action-icon" />
          </div>
        </div>
        <div className="notes-content">
          <p className="notes-text">{medicalHistory}</p>
        </div>
      </div>

      <div className="lab-results">
        <div className="lab-results-header">
          <h3>Lab Results</h3>
          <FaEllipsisV className="menu-icon" />
        </div>
        <div className="lab-results-content">
          <ul>
            {labResults && labResults.map((result, index) => (
              <li key={index}>
                {result.name} ({result.date}) - {result.fileType.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
