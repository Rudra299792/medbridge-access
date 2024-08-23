import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bookAppointment } from '../slices/appointmentSlice';

const AppointmentModal = ({ isOpen, onClose }) => {
  const [problem, setProblem] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Initialize Razorpay
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: 50000, // Amount in paise (e.g., 500 INR)
      name: 'Doctor Appointment',
      description: 'Appointment Booking',
      handler: function(response) {
        // Dispatch action to save appointment and payment details
        dispatch(bookAppointment({
          problem_description: problem,
          razorpay_payment_id: response.razorpay_payment_id
        }));
        onClose();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your medical problem"
            required
          />
          <button type="submit">Book and Pay</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AppointmentModal;