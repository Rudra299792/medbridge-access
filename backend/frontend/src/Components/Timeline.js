import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatientDetails } from '../slices/patientSlice';
import { fetchDoctorAppointmentsByDate } from '../slices/doctorSlice'; // import the thunk

import { useNavigate } from 'react-router-dom';
import '../CSS/Timeline.css';

const Timeline = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointments, loading, error } = useSelector((state) => state.doctor);
  useEffect(() => {
    dispatch(fetchDoctorAppointmentsByDate(selectedDate));
  }, [selectedDate, dispatch]);




 console.log(appointments)
  const handlePatientClick = (patientId) => {
    dispatch(fetchPatientDetails(patientId)).then(() => {
      navigate(`/doctors/chat/${patientId}`);
    });
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) {
    const errorMessage = typeof error === 'string' ? error : error.detail || 'An error occurred while fetching appointments';
    return <p>Error fetching appointments: {errorMessage}</p>;
  }

  return (
    <div className="timeline">
      <h2>Appointments on {selectedDate.toLocaleDateString()}</h2>
      <div className="timeline-content">
        <div className="time-column">
          {appointments.map((appointment, index) => (
            <div key={index} className="time-slot">
              {new Date(appointment.appointment_time).toLocaleTimeString()}
            </div>
          ))}
        </div>
        <div className="separator"></div>
        <div className="events-column">
          {appointments.map((appointment, index) => (
            <div key={index} className="event">
              <div className="event-title">{appointment.problem_description}</div>
              <div className="event-details">
                <span 
                  className={`patient-name ${appointment.patient ? 'clickable' : ''}`} 
                  onClick={() => handlePatientClick(appointment.patient.id)}
                >
                  Patient Name - {appointment.patient.user.first_name || 'N/A'} {appointment.patient.user.last_name || ''}
                </span>
                <span>{new Date(appointment.appointment_time).toLocaleTimeString()}</span>
              </div>
              <a href="#" className="view-details" onClick={() => handlePatientClick(appointment.patient.id)}>View Details</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
