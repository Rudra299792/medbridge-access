import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { logout } from '../slices/userSlice'; // Import the logout action
import '../CSS/DoctorSidebar.css'; // Assuming you will style it using CSS

const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create a navigate function for redirection

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect the user to the login page after logout
  };

  return (
    <div className="sidebar">
      <div className='logo-box' >
        <img src='/icons/logo.png' alt='Medbridge-access-logo' className="Medbridge-access-logo" />
        <div className="logo">
          <h1><span className="title-we">Med</span>
            <div className="title-2"><span>Bridge</span> <span>Access</span></div>
          </h1>
        </div>
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
        <button onClick={handleLogout} className="nav-item logout-button"> {/* Use a button for logout */}
          <i className="icon-logout"></i> Logout
        </button>
      </nav>
    </div>
  );
};

export default UserSidebar;
