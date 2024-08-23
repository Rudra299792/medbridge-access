const createSocketConnection = (roomName, token, onMessageCallback) => {
  let socket;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds
  const messageQueue = [];

  const connect = () => {
      // If socket exists and is open or connecting, don't create a new one
      if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
          return;
      }

      socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/?token=${token}`);

      socket.onopen = () => {
          console.log(`Connected to room: ${roomName}`);
          reconnectAttempts = 0;

          // Send any messages that were queued while the connection was being established
          while (messageQueue.length > 0) {
              const message = messageQueue.shift();
              socket.send(JSON.stringify(message));
          }
      };

      socket.onclose = (event) => {
          console.log('WebSocket closed:', event);
          if (!event.wasClean) {
              console.error('WebSocket closed unexpectedly:', event.reason);
              if (reconnectAttempts < maxReconnectAttempts) {
                  console.log(`Reconnecting in ${reconnectDelay * reconnectAttempts / 1000} seconds...`);
                  reconnectAttempts++;
                  setTimeout(connect, reconnectDelay * reconnectAttempts);
              } else {
                  console.error('Max reconnect attempts reached. Please refresh the page.');
              }
          }
      };

      socket.onerror = (error) => {
          console.error('WebSocket encountered error:', error.message);
      };

      socket.onmessage = (event) => {
          try {
              const data = JSON.parse(event.data);
              console.log('Received WebSocket message:', data);

              // Pass the received data to the callback provided by ChatWindow
              if (typeof onMessageCallback === 'function') {
                  onMessageCallback(data);
              }
          } catch (error) {
              console.error('Error parsing WebSocket message:', error);
          }
      };
  };

  connect();

  return {
      send: (data) => {
          if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(data));
          } else {
              console.warn('WebSocket is not open. Queueing message:', data);
              messageQueue.push(data);
          }
      },
      close: () => {
          if (socket) {
              socket.close();
          }
      },
      getState: () => (socket ? socket.readyState : null),
  };
};

export default createSocketConnection;
