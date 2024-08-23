import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import socket from '../services/websocket';

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  max-height: 100%;
`;

const LocalVideo = styled.video`
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 200px;
  height: 150px;
  background: black;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const VideoCall = ({ selectedUser, onEndCall }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    const startCall = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      peerConnection.current = new RTCPeerConnection(servers);

      localStream.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream));

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', {
            to: selectedUser,
            candidate: event.candidate,
          });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit('offer', {
        to: selectedUser,
        offer: peerConnection.current.localDescription,
      });
    };

    startCall();

    socket.on('offer', async (data) => {
      if (data.offer) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit('answer', {
          to: data.from,
          answer: peerConnection.current.localDescription,
        });
      }
    });

    socket.on('answer', (data) => {
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on('ice-candidate', (data) => {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    socket.on('end-call', () => {
      peerConnection.current.close();
      onEndCall();
    });

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('end-call');
    };
  }, [selectedUser, onEndCall]);

  const toggleMute = () => {
    const localStream = localVideoRef.current.srcObject;
    localStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    const localStream = localVideoRef.current.srcObject;
    localStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
    setIsCameraOff(!isCameraOff);
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    // Stop all local media tracks
    const localStream = localVideoRef.current.srcObject;
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Clear video elements to release the camera
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    socket.emit('end-call', { to: selectedUser });
    onEndCall();
  };

  return (
    <FullScreenContainer>
      <Video ref={remoteVideoRef} autoPlay playsInline />
      <LocalVideo ref={localVideoRef} autoPlay playsInline />
      <Controls>
        <Button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</Button>
        <Button onClick={toggleCamera}>{isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}</Button>
        <Button onClick={endCall}>End Call</Button>
      </Controls>
    </FullScreenContainer>
  );
};

export default VideoCall;
