import React, { useState } from 'react';
import Login from './components/Login';
import OnlineUsers from './components/OnlineUsers';
import FileTransfer from './components/FileTransfer';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [peerConnection, setPeerConnection] = useState(null);

  const connectToPeer = (userId) => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    // Thiết lập các sự kiện WebRTC tại đây
  };

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} setUsername={setUsername} />
      ) : (
        <div>
          <h1>Welcome, {username}</h1>
          <OnlineUsers token={token} connectToPeer={connectToPeer} />
          {peerConnection && <FileTransfer peerConnection={peerConnection} />}
        </div>
      )}
    </div>
  );
};

export default App;
