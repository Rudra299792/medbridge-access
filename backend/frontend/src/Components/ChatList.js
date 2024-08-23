import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../slices/userSlice';
import styled from 'styled-components';

const ChatListContainer = styled.div`
  width: 400px;
  background-color: #f7f7f7;
  border-right: 1px solid #ddd;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfo = styled.div`
  flex-grow: 1;
`;

const UserName = styled.div`
  font-weight: 400;
`;

const LastMessage = styled.div`
  font-size: 12px;
  color: #666;
`;

const LastMessageTime = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const ChatList = ({ setSelectedUser }) => {
  const dispatch = useDispatch();
  const { appointments, status, error, userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData && userData.access_token) {  // Adjusted the token check
      dispatch(fetchAppointments());
    } else {
      console.log('User not logged in, redirecting to login page.');
      // Optionally, redirect to login page or show a message
    }
  }, [dispatch, userData]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error ? error.toString() : 'Failed to load appointments'}</div>;
  }

  return (
    <ChatListContainer>
      <div className='logo-box'>
        <img src='/icons/logo.png' alt='Medbridge-access-logo' className="Medbridge-access-logo" />
        <div className="logo">
          <h1>
            <span className="title-we">Med</span>
            <div className="title-2">
              <span>Bridge</span> <span>Access</span>
            </div>
          </h1>
        </div>
      </div>
      {Array.isArray(appointments) && appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <UserItem key={index} onClick={() => setSelectedUser(appointment.doctor)}>
            <UserPhoto 
              src={appointment.doctor?.profile_photo || '/default-avatar.png'} 
              alt={`${appointment.doctor?.user?.first_name || 'Doctor'}'s photo`} 
            />
            <UserInfo>
              <UserName>
                {appointment.doctor?.user?.first_name || 'Unknown'} {appointment.doctor?.user?.last_name || ''}
              </UserName>
              <LastMessage>{appointment.problem_description || 'No description available'}</LastMessage>
            </UserInfo>
            <LastMessageTime>
              {appointment.appointment_time 
                ? new Date(appointment.appointment_time).toLocaleString() 
                : 'Time not set'}
            </LastMessageTime>
          </UserItem>
        ))
      ) : (
        <div>No appointments available</div>
      )}
    </ChatListContainer>
  );
};

export default ChatList;
