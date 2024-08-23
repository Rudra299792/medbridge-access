import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/userSlice';
import '../CSS/LoginModal.css'; // You'll want to create a CSS file to style the modal

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        onClose(); // Close the modal on successful login
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={userState.status === 'loading'}>
            {userState.status === 'loading' ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {userState.status === 'failed' && (
          <p className="error-message">
            Error: {typeof userState.error === 'string' ? userState.error : JSON.stringify(userState.error)}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
