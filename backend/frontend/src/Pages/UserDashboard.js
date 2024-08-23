import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuotations } from '../slices/quotationSlice';
import { fetchMedicalOpinions } from '../slices/medicalOpinionSlice';
import UserSidebar from '../Components/UserSidebar';
import { Link,Navigate } from 'react-router-dom';
import '../CSS/UserDashboard.css';
import AppointmentModal from '../Components/AppointmentModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.
  userData);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (userData) {
      // dispatch(fetchQuotations());
      // dispatch(fetchMedicalOpinions());
    }
  }, [dispatch, userData]);

  if (!userData) {
    return <Navigate to="/bookappointment" />;
  }

  return (
    <div className="dashboard">
      <UserSidebar />
      <div>
      <h1 className="username">Welcome, {userData.username}</h1>
     
      <div className="appointment-card">
        <img src="banner/banner2.jpeg" alt="Doctor" className="doctor-image" />
        <div className="appointment-details">
          <h2>Dr. John Doe</h2>
          <p>Qualification: MBBS, MD</p>
          <p>Appointment Time: 10:00 AM, 20th August 2024</p>
          <p>Patient's Complaint: Feeling pain in stomach, vommiting ,pale skin</p>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => console.log('Free Quote clicked')}>
          Free Quote
        </button>
        <button onClick={() => setIsModalOpen(true)}>
            Book Appointment
          </button>
      </div>
      <div className='user-links'>
        <Link to="/quotations" className="link-button">
          <h2>Past Quotations</h2>
          <i class="fa-solid fa-angle-right "></i>
        </Link>
      
        <Link to="/medical-opinions" className="link-button">
          <h2>Past Medical Opinions</h2>
          <i class="fa-solid fa-angle-right "></i>
        </Link>
        <Link to="/medical-opinions" className="link-button">
          <h2>Profile &  Medical Reports</h2>
          <i class="fa-solid fa-angle-right "></i>
        </Link>
      </div>
      </div>
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
