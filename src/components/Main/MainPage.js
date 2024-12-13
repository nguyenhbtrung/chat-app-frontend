import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Box, Typography, Container } from "@mui/material";
import useWebRTC from "../../hooks/useWebRTC";
import OnlineUsers from "./OnlineUsers";
import FileTransfer from "./FileTransfer";

const MainPage = () => {
    const [token] = useState(localStorage.getItem("token"));
    const [username] = useState(localStorage.getItem("username"));
    const [socket, setSocket] = useState(null);
    const [peerId, setPeerId] = useState("");

    useEffect(() => {
        const newSocket = io("http://localhost:8080");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setPeerId(newSocket.id);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const { createPeerConnection, sendOffer, sendFile, receivedFiles } = useWebRTC(socket);

    const connectToPeer = (userId) => {
        createPeerConnection((data) => {
            console.log("Received file data:", data);
        });
        sendOffer(userId);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome, {username}
            </Typography>
            {socket && peerId && (
                <Typography variant="subtitle1">
                    Your Peer ID: <strong>{peerId}</strong>
                </Typography>
            )}
            {socket && (
                <OnlineUsers
                    token={token}
                    connectToPeer={connectToPeer}
                    socket={socket}
                />
            )}
            <FileTransfer sendFile={sendFile} />
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5">Received Files</Typography>
                <ul>
                    {receivedFiles.map((file, index) => (
                        <li key={index}>
                            <a href={file.url} download={file.name}>
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </Box>
        </Container>
    );
};

export default MainPage;
