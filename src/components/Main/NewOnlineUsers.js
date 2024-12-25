import { Alert, Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";


const OnlineUsers = ({ token, connectToPeer, socket, handleUserClick, selectedUser, connectionStatus }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!socket) {
            console.log("Socket is not defined yet.");
            return;
        }

        const handleConnect = () => {
            const username = sessionStorage.getItem("username");
            socket.emit("register", username);
        };



        // const handleConnectionSuccessful = ({ remote }) => {
        //     setConnectionStatus((prev) => ({
        //         ...prev,
        //         [remote]: "connected",
        //     }));
        // };

        // const handlePeerDisconnected = ({ remote }) => {
        //     setConnectionStatus((prev) => ({
        //         ...prev,
        //         [remote]: "disconnected",
        //     }));
        // };

        // const handleConnectionRejected = ({ from }) => {
        //     setConnectionStatus((prev) => ({
        //         ...prev,
        //         [from]: "",
        //     }));
        // };

        socket.on("connect", handleConnect);
        socket.on("active-users", handleActiveUsers);
        socket.on("get-active-users", handleActiveUsers);
        // socket.on("connection-succesful", handleConnectionSuccessful);
        // socket.on("peer-disconnected", handlePeerDisconnected);
        // socket.on("connection-rejected", handleConnectionRejected);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("active-users", handleActiveUsers);
            socket.off("get-active-users", handleActiveUsers);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;
        socket.emit("get-active-users");
    }, []);

    const handleActiveUsers = (activeUsers) => {
        setUsers(activeUsers.filter(([id]) => id !== socket.id)); // Loại bỏ chính mình
    };


    return (
        <List sx={{ overflowY: 'auto', maxHeight: 380 }}>
            {
                // Array(15).fill(0).map((_, id)
                users.map(([id, user]) => (
                    <ListItem
                        key={id}
                        button
                        onClick={() => handleUserClick(id, user.username)}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: selectedUser === id ? '#f0f0f0' : 'transparent',
                            cursor: 'pointer',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.username}
                            secondary={`Peer Id: ${id}`}
                        />

                        {connectionStatus[id] === "connected" && (
                            <Alert
                                severity="success"
                                sx={{
                                    padding: "1px 3px",
                                }}
                            >

                            </Alert>
                        )}
                        {connectionStatus[id] === "requesting" && (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                                <CircularProgress size={20} />
                            </Box>
                        )}

                    </ListItem>
                ))}
        </List>
    );
};

export default OnlineUsers;