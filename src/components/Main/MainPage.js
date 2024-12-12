import React, { useState, useEffect } from 'react';
import Login from '../Auth/Login';
import useWebRTC from '../../hooks/useWebRTC';
import OnlineUsers from './OnlineUsers';
import FileTransfer from './FileTransfer';
import { io } from "socket.io-client";

const MainPage = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:8080"); // Connect to backend
        setSocket(newSocket);

        return () => {
            console.log("Disconnecting socket...");
            newSocket.disconnect(); // Disconnect when component unmounts
        };
    }, []);

    const { createPeerConnection, sendOffer, sendFile } = useWebRTC(socket);

    const connectToPeer = (userId) => {
        createPeerConnection((data) => {
            console.log("Received file data:", data);
        });
        sendOffer(userId);
    };

    return (
        <div>
            <h1>Welcome, {username}</h1>
            {socket && (
                <OnlineUsers
                    token={token}
                    connectToPeer={connectToPeer}
                    socket={socket}
                />
            )}
            <FileTransfer
                sendFile={sendFile}
            />
        </div>
    );
};

export default MainPage;
