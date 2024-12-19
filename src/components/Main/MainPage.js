import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Box, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, AppBar, Toolbar } from "@mui/material";
import useWebRTC from "../../hooks/useWebRTC";
import OnlineUsers from "./OnlineUsers";
import FileTransfer from "./FileTransfer";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [token] = useState(sessionStorage.getItem("token"));
    const [username] = useState(sessionStorage.getItem("username"));
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    const socketRef = useRef(null);
    const [peerId, setPeerId] = useState("");
    const [connectionRequest, setConnectionRequest] = useState(null);
    const { createPeerConnection, sendOffer, sendFile, receivedFiles, progress, CheckSocket } = useWebRTC(socketRef);

    useEffect(() => {
        const newSocket = io("http://localhost:8080");
        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setPeerId(newSocket.id);
        });

        newSocket.on("request-connection", ({ from }) => {
            setConnectionRequest(from);
        });

        newSocket.on("connection-accepted", ({ from }) => {
            handleConnectionAccepted(from);
        });

        return () => {
            console.log("Disconnecting socket...");
            newSocket.disconnect();
        };
    }, []);


    const handleAcceptConnection = () => {
        if (!connectionRequest) return;

        socket.emit("connection-accepted", { to: connectionRequest });

        setConnectionRequest(null); // Đóng dialog
    };

    const handleRejectConnection = () => {
        if (!connectionRequest) return;

        socket.emit("connection-rejected", { to: connectionRequest });

        setConnectionRequest(null); // Đóng dialog
    };

    const connectToPeer = (peerId) => {
        socket.emit("request-connection", peerId);
    };

    const handleConnectionAccepted = (peerId) => {
        createPeerConnection((data) => {
            console.log("Received file data:", data);
        });
        sendOffer(peerId);
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        File Sharing
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ marginTop: 4 }}>
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
                <FileTransfer sendFile={sendFile} progress={progress} />
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5">Received Files</Typography>
                    <ul>
                        {receivedFiles.map((file, index) => (
                            <li key={index}>
                                <Typography variant="body2">
                                    <strong>Sender:</strong> {file.sender} |{" "}
                                    <a href={file.url} download={file.name}>
                                        {file.name}
                                    </a>
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Box>

                <Dialog open={!!connectionRequest} onClose={handleRejectConnection}>
                    <DialogTitle>Connection Request</DialogTitle>
                    <DialogContent>
                        <Typography>
                            User with Peer ID <strong>{connectionRequest}</strong> wants to connect.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRejectConnection} color="secondary">
                            Reject
                        </Button>
                        <Button onClick={handleAcceptConnection} color="primary">
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default MainPage;
