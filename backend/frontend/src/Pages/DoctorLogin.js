import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginDoctor } from '../slices/doctorSlice'; // Import loginDoctor instead of loginUser
import { Link, useNavigate } from 'react-router-dom';
import TestimonialSection from '../Components/TestimonialSection';
import '../CSS/DoctorRegistrationForm.css';  // Import your CSS

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    // If doctor is already logged in, redirect to doctor dashboard
    if (doctor) {
      navigate('/doctors/doctordashboard');
    }
  }, [doctor, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginDoctor(formData));
  };

  const renderErrorMessages = (error) => {
    if (!error) return null;

    if (typeof error === 'string') {
      return <p>{error}</p>;
    } else if (typeof error === 'object') {
      return (
        <ul>
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>
              {key}: {Array.isArray(value) ? value.join(', ') : value.toString()}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="login-container">
    <TestimonialSection />
      <form className="form-section" onSubmit={handleSubmit}>
        <h3>Account Access</h3>
        <p className="form-subheading">Welcome back! Please login to your account.</p>

        {error && renderErrorMessages(error)}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Logging In...' : 'Log In'}
        </button>

        <p className="form-end">
          Don't have an account? <Link to="/doctors/registration">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
