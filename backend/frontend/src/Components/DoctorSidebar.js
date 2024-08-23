import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { logout } from '../slices/doctorSlice'; // Import the logout action
import '../CSS/DoctorSidebar.css'; // Assuming you will style it using CSS

const DoctorSidebar = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create a navigate function for redirection

  const handleToggleChange = () => {
    setIsAvailable(!isAvailable);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/doctors/login'); // Redirect the user to the login page after logout
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src="/icons/profile.png" alt="Doctor's Profile" className="profile-image" />
        <h3 className="doctor-name">Dr. Ashish Tomar</h3>
        <label className="status-toggle">
          Available
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={handleToggleChange} // Handler to update state
          />
          <span className="slider"></span>
        </label>
      </div>

      <nav className="nav-items">
        <Link to="/appointments" className="nav-item">
          <i className="icon-appointments"></i> Appointments
        </Link>
        <Link to="/personal-details" className="nav-item">
          <i className="icon-details"></i> Personal Details
        </Link>
        <Link to="/messages" className="nav-item">
          <i className="icon-messages"></i> Messages
        </Link>
        <Link to="/patients" className="nav-item">
          <i className="icon-patients"></i> Patients
        </Link>
        <Link to="/reports" className="nav-item">
          <i className="icon-reports"></i> Reports
        </Link>
        <Link to="/billing" className="nav-item">
          <i className="icon-billing"></i> Billing
        </Link>
        <Link to="/notifications" className="nav-item">
          <i className="icon-notifications"></i> Notifications
        </Link>
        <Link to="/settings" className="nav-item">
          <i className="icon-settings"></i> Settings
        </Link>
        <button onClick={handleLogout} className="nav-item logout-button">
          <i className="icon-logout"></i> Log Out
        </button>
      </nav>
    </div>
  );
};

export default DoctorSidebar;
