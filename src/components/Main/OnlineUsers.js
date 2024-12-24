import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Button, Divider, Alert } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const OnlineUsers = ({ token, connectToPeer, socket }) => {
    const [users, setUsers] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState({});

    useEffect(() => {
        if (!socket) {
            console.log("Socket is not defined yet.");
            return;
        }

        const handleConnect = () => {
            const username = sessionStorage.getItem("username");
            socket.emit("register", username);
        };

        const handleActiveUsers = (activeUsers) => {
            setUsers(activeUsers.filter(([id]) => id !== socket.id)); // Loại bỏ chính mình
        };

        const handleConnectionSuccessful = ({ remote }) => {
            setConnectionStatus((prev) => ({
                ...prev,
                [remote]: "connected",
            }));
        };

        const handlePeerDisconnected = ({ remote }) => {
            setConnectionStatus((prev) => ({
                ...prev,
                [remote]: "disconnected",
            }));
        };

        const handleConnectionRejected = ({ from }) => {
            setConnectionStatus((prev) => ({
                ...prev,
                [from]: "",
            }));
        };

        socket.on("connect", handleConnect);
        socket.on("active-users", handleActiveUsers);
        socket.on("connection-succesful", handleConnectionSuccessful);
        socket.on("peer-disconnected", handlePeerDisconnected);
        socket.on("connection-rejected", handleConnectionRejected);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("active-users", handleActiveUsers);
        };
    }, [socket]);

    const handleConnectClick = (id) => {
        connectToPeer(id);
        setConnectionStatus((prev) => ({
            ...prev,
            [id]: "requesting",
        }));
    };

    const handleDisconnectClick = (id) => {

    };

    return (
        <Box sx={{ marginTop: 2, padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                Online Users
            </Typography>
            <List>
                {users.map(([id, user]) => (
                    <React.Fragment key={id}>
                        <ListItem
                            secondaryAction={
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    {connectionStatus[id] === "requesting" && (
                                        <Alert severity="info" sx={{ padding: "2px 8px" }}>
                                            Sending Request...
                                        </Alert>
                                    )}
                                    {connectionStatus[id] === "connected" && (
                                        <Alert severity="success" sx={{ padding: "2px 8px" }}>
                                            Connected
                                        </Alert>
                                    )}
                                    {connectionStatus[id] !== "connected" && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleConnectClick(id)}
                                            disabled={connectionStatus[id] === "requesting"} // Vô hiệu hóa nút nếu đã kết nối
                                        >
                                            Connect
                                        </Button>
                                    )}
                                    {connectionStatus[id] === "connected" && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDisconnectClick(id)}
                                        >
                                            Disconnect
                                        </Button>
                                    )}

                                </Box>
                            }
                        >
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.primary',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}
                            >
                                <PersonIcon sx={{ color: 'primary.main' }} />
                                {user.username} | Peer ID: {id}
                            </Typography>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

};

export default OnlineUsers;
