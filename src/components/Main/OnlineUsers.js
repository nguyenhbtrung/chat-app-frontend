import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Button, Divider } from "@mui/material";

const OnlineUsers = ({ token, connectToPeer, socket }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!socket) {
            console.log("Socket is not defined yet.");
            return;
        }

        const handleConnect = () => {
            const username = localStorage.getItem("username");
            socket.emit("register", username);
        };

        const handleActiveUsers = (activeUsers) => {
            setUsers(activeUsers.filter(([id]) => id !== socket.id)); // Loại bỏ chính mình
        };

        socket.on("connect", handleConnect);
        socket.on("active-users", handleActiveUsers);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("active-users", handleActiveUsers);
        };
    }, [socket]);

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
                                <Button variant="contained" color="primary" onClick={() => connectToPeer(id)}>
                                    Connect
                                </Button>
                            }
                        >
                            <Typography>{user.username} (Peer ID: {id})</Typography>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default OnlineUsers;
