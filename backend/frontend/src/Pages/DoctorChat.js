import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PatientProfile from '../Components/PatientProfile';
import ChatWindow from '../Components/ChatWindow';
import { fetchPatientDetails, clearPatientDetails } from '../slices/patientSlice';

const ChatAppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const DoctorChatApp = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const { details: patient, loading, error } = useSelector((state) => state.patient);
  const doctor = useSelector((state) => state.doctor.doctor);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchPatientDetails(patientId));
    }

    return () => {
      dispatch(clearPatientDetails());
    };
  }, [dispatch, patientId]);

  const generateRoomName = (user1Id, user2Id) => {
    return [user1Id, user2Id].sort().join('_');
  };

  if (loading) return <p>Loading patient details...</p>;
  if (error) return <p>Error loading patient details: {error}</p>;

  return (
    <ChatAppContainer>
      {patient && <PatientProfile selectedUser={patient} />}
      {patient && patient.user && doctor && doctor.user && (
        <ChatWindow 
          selectedUser={patient} 
          roomName={generateRoomName(doctor.user.id, patient.user.id)} 
          currentUser={doctor} 
        />
      )}
    </ChatAppContainer>
  );
};

export default DoctorChatApp;

