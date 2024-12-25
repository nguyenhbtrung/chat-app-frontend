import React, { useEffect, useRef, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import LinkIcon from '@mui/icons-material/Link';
import useWebRTC from '../../hooks/useWebRTC';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import OnlineUsers from './NewOnlineUsers';

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

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleUserClick = (id, username) => {
        setSelectedUser(id);
        setSelectedUserData((prev) => ({
            ...prev,
            username: username,
            id: id,
        }));
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <OnlineUsers
                        handleUserClick={handleUserClick}
                        selectedUser={selectedUser}
                        token={token}
                        connectToPeer={connectToPeer}
                        socket={socket}
                    />
                );
            case 1:
                return <Typography variant="body1">Offline Content</Typography>;
            case 2:
                return <Typography variant="body1">Received Files Content</Typography>;
            default:
                return null;
        }
    };


    return (
        <Box sx={{ backgroundColor: '#f0f8ff' }}>
            {/* AppBar */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        File Sharing
                    </Typography>
                    <Button color="inherit">LOGOUT</Button>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Grid container spacing={2} sx={{ height: 'calc(100vh - 64px)', padding: 2 }}>
                {/* Left Sidebar */}
                <Grid item xs={4}>
                    <Paper elevation={3} sx={{ height: '100%', maxHeight: 'calc(100vh - 64px)', padding: 2, borderRadius: 4, overflowY: 'auto' }}>
                        <Typography variant="h6">Welcome, {username}</Typography>
                        {socket && peerId && (
                            <Typography variant="body2" color="text.secondary">
                                Your Peer ID: <strong>{peerId}</strong>
                            </Typography>
                        )}


                        {/* Tabs */}
                        <Tabs value={selectedTab} indicatorColor="primary" textColor="primary" sx={{ marginTop: 2 }} onChange={handleTabChange}>
                            <Tab label="Online" />
                            <Tab label="Offline" />
                            <Tab label="Received Files" />
                        </Tabs>

                        {/* Tab Content */}
                        {renderContent()}
                    </Paper>
                </Grid>



                {/* Chat Section */}
                <Grid item xs={8}>
                    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
                        {/* Chat Header */}
                        <Box
                            sx={{
                                padding: 2,
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ marginRight: 2 }}></Avatar>
                                <Box>
                                    <Typography variant="h6">{selectedUserData?.username}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Peer Id: {selectedUser}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<LinkIcon />}
                                >
                                    CONNECT
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<VideocamIcon />}
                                    sx={{ marginLeft: 1 }}
                                >
                                    CALL VIDEO
                                </Button>
                            </Box>
                        </Box>


                        {/* Chat Messages */}
                        <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto' }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                <Avatar sx={{ width: 28, height: 28, marginRight: 1 }}></Avatar>
                                <Box
                                    sx={{
                                        padding: 1,
                                        borderRadius: 2,
                                        backgroundColor: '#f1f1f1',
                                        maxWidth: '70%',
                                    }}
                                >
                                    hello
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                <Avatar sx={{ width: 28, height: 28, marginRight: 1 }}></Avatar>
                                <Box
                                    sx={{
                                        padding: 1,
                                        borderRadius: 2,
                                        backgroundColor: '#f1f1f1',
                                        maxWidth: '70%',
                                    }}
                                >
                                    how are you
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
                                <Box
                                    sx={{
                                        padding: 1,
                                        borderRadius: 2,
                                        backgroundColor: '#673ab7',
                                        color: '#fff',
                                        maxWidth: '70%',
                                    }}
                                >
                                    hello
                                </Box>
                            </Box>
                        </Box>

                        {/* Chat Input */}
                        <Box
                            sx={{
                                padding: 2,
                                borderTop: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                type="file"
                                variant="outlined"
                                size="small"
                                sx={{
                                    marginRight: 1,
                                    flex: 1, // Chiếm 1 nửa không gian
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginRight: 1,
                                    whiteSpace: 'nowrap', // Đảm bảo nội dung không xuống dòng
                                    minWidth: 'auto',     // Điều chỉnh kích thước tối thiểu của nút
                                    padding: '6px 12px',  // Điều chỉnh padding nếu cần
                                }}
                            >
                                Send File
                            </Button>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Gửi tin nhắn"
                                sx={{
                                    marginRight: 1,
                                    flex: 1, // Chiếm 1 nửa không gian
                                }}
                                slotProps={{
                                    input: {
                                        sx: {
                                            borderRadius: 8, // điều chỉnh mức độ bo tròn
                                        },
                                    },
                                }}
                            />
                            <IconButton color="primary">
                                <SendIcon />
                            </IconButton>
                        </Box>

                    </Paper>
                </Grid>
            </Grid>
        </Box >
    );
};

export default MainPage;
