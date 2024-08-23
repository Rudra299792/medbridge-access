import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import createSocketConnection from '../services/websocket';

const ChatWindowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CallButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.$isCurrentUser ? 'flex-end' : 'flex-start' };
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.$isCurrentUser ? '#DCF8C6' : '#E8E8E8'};
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  word-wrap: break-word;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 10px;
  cursor: pointer;
  gap: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const ChatWindow = ({ selectedUser, roomName, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState(null);

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    if (!selectedUser || !roomName) return;

    if (socket.current) {
        socket.current.close();
    }

    socket.current = createSocketConnection(roomName, currentUser.access_token, (data) => {
        
        if (data.type) {
            if (data.type === 'chat_message') {
                handleIncomingMessage(data);
            } else if (data.type === 'fetch_previous_messages') {
                handlePreviousMessages(data.messages);
            }
        } else {
            // Handle messages that don't have a 'type' field
      
            handleIncomingMessage({
                sender: data.sender,
                message: data.message,
                roomName: data.roomName,
                timestamp: new Date().toISOString()
            });
        }
    });

    fetchPreviousMessages();

    return () => {
        if (socket.current) {
            socket.current.close();
        }
    };
}, [roomName, selectedUser, currentUser])

  const fetchPreviousMessages = () => {
    socket.current.send({
      type: 'fetch_previous_messages',
      roomName: roomName
    });
  };

  const handleIncomingMessage = (data) => {
    
    setMessages((prevMessages) => {
        // Deduplication logic: compare by sender and content, ignore small differences in timestamp
        const existingMessage = prevMessages.find(
            (msg) =>
                msg.content === data.message &&
                msg.sender === data.sender &&
                Math.abs(new Date(msg.timestamp).getTime() - new Date(data.timestamp).getTime()) < 1000 // 1-second tolerance
        );

        if (existingMessage) {
            // Message already exists, return the previous state
            return prevMessages;
        }

        // Log for debugging purposes
        console.log("Adding new message:", data);

        return [
            ...prevMessages,
            {
                sender: data.sender,
                content: data.message,
                files: data.files || [],
                timestamp: data.timestamp || new Date().toISOString(),
                isCurrentUser: data.sender === currentUser.user.username,
            },
        ];
    });
};

  


  const handlePreviousMessages = (messageArray) => {
    const previousMessages = messageArray.map((msg) => ({
      sender: msg.sender,
      content: msg.message,
      timestamp: msg.timestamp,
      files: msg.files || [],
      isCurrentUser: msg.sender === currentUser.user.username
    }));
    
    setMessages(previousMessages);
  };

  const sendMessage = ({ message, files }) => {
    if (socket.current && message) {
      const messageData = {
        type: 'chat_message',
        message,
        files: files.map(file => file.name),
        to: selectedUser.user.username,
        senderType: currentUser.user_type,
        receiverType: selectedUser.user_type,
        roomName: roomName,
      };
      console.log('hi')
      socket.current.send(messageData);

  
    }
  };
  
  const startCall = async (type) => {
    setIsCalling(true);
    setCallType(type);

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: type === 'video',
      audio: true,
    });

    localStreamRef.current = localStream;
    peerConnectionRef.current = createPeerConnection();

    localStream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStream);
    });

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.current.send(JSON.stringify({
      type: 'offer',
      offer,
      to: selectedUser.user.username,
      callType: type,
    }));
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Public STUN server
      ],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.send(JSON.stringify({
          type: 'ice-candidate',
          candidate: event.candidate,
          to: selectedUser.user.username,
        }));
      }
    };

    pc.ontrack = (event) => {
      remoteStreamRef.current.srcObject = event.streams[0];
    };

    return pc;
  };

  const handleIncomingCall = (data) => {
    if (window.confirm(`Incoming ${data.callType} call from ${data.from}. Do you want to accept?`)) {
      startCall(data.callType);
    } else {
      socket.current.send(JSON.stringify({ type: 'unanswered-call', to: data.from }));
    }
  };

  const handleOffer = async (data) => {
    peerConnectionRef.current = createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: data.callType === 'video',
      audio: true,
    });

    localStreamRef.current = localStream;
    localStream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStream);
    });

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socket.current.send(JSON.stringify({
      type: 'answer',
      answer,
      to: data.from,
    }));
  };

  const handleAnswer = async (data) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  };

  const handleICECandidate = (data) => {
    const candidate = new RTCIceCandidate(data.candidate);
    peerConnectionRef.current.addIceCandidate(candidate);
  };

  const handleUnansweredCall = () => {
    setIsCalling(false);
    setCallType(null);
  };

  const endCall = () => {
    socket.current.send(JSON.stringify({
      type: 'end-call',
      to: selectedUser.user.username,
    }));
    handleEndCall();
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallType(null);

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (remoteStreamRef.current) {
      remoteStreamRef.current.srcObject = null;
    }
  };
console.log(messages)
  return (
    <ChatWindowContainer>
      <Header>
        <div>{selectedUser.user.first_name} {selectedUser.user.last_name}</div>
        <CallButtons>
          <IconButton onClick={() => startCall('audio')}>
            <img src="/icons/call.png" alt="Call" />
          </IconButton>
          <IconButton onClick={() => startCall('video')}>
            <img src="/icons/video.png" alt="Video Call" />
          </IconButton>
          {isCalling && (
            <IconButton onClick={endCall}>
              <img src="/icons/end-call.png" alt="End Call" />
            </IconButton>
          )}
        </CallButtons>
      </Header>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <MessageWrapper key={index} $isCurrentUser={msg.isCurrentUser}>
     
            <MessageBubble $isCurrentUser={msg.isCurrentUser}>
              <strong> </strong>{msg.content}
              {msg.files && msg.files.length > 0 && (
                <div>
                  <strong>Files:</strong>
                  <ul>
                    {msg.files.map((file, fileIndex) => (
                      <li key={fileIndex}>{file.name || file}</li>
                    ))}
                  </ul>
                </div>
              )}
            </MessageBubble>
          </MessageWrapper>
        ))}
      </MessagesContainer>
    <MessageInput onSendMessage={sendMessage} />
      {isCalling && callType && (
        <VideoContainer>
          <video ref={localStreamRef} autoPlay muted style={{ width: '45%' }} />
          <video ref={remoteStreamRef} autoPlay style={{ width: '45%' }} />
        </VideoContainer>
      )}
    </ChatWindowContainer>
  );
};

export default ChatWindow;
