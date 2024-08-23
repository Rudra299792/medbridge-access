import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSS/DoctorDashboard.css';
import DoctorSidebar from '../Components/DoctorSidebar';
import DashboardContent from '../Components/DashboardContent';
const DoctorDashboard = () => {
  const doctor = useSelector((state) => state.doctor.doctor);
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctor) {
      navigate('/doctors/login');
    }
  }, [doctor, navigate]);

  if (!doctor) {
    return null; // or a loading spinner
  }

 


  return (
   <div className='doctor-dashboard'>
      
      <DoctorSidebar />
      
    <DashboardContent />
      </div>
  );
};

export default DoctorDashboard;
