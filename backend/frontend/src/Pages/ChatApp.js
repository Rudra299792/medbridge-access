import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatList from '../Components/ChatList';
import ChatWindow from '../Components/ChatWindow';

const ChatAppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (!currentUser) {
      console.log('User not logged in.');
    }
  }, [currentUser]);

  const generateRoomName = (user1Id, user2Id) => {
    return [user1Id, user2Id].sort().join('_');
  };

  if (!currentUser) {
    return <div>Please log in to view your chats.</div>;
  }

  return (
    <ChatAppContainer>
      <ChatList setSelectedUser={setSelectedUser} />
      {selectedUser && (
        <ChatWindow 
          selectedUser={selectedUser} 
          roomName={generateRoomName(selectedUser.user.id, currentUser.user.id)} 
          currentUser={currentUser} 
        />
      )}
    </ChatAppContainer>
  );
};

export default ChatApp;

