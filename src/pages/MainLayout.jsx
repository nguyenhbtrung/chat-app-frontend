import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    Badge,
    Paper,
    Tabs,
    Tab,
    Drawer,
    useMediaQuery,
    Tooltip
} from '@mui/material';
import {
    Search,
    MoreVert,
    VideoCall,
    AttachFile,
    Send,
    EmojiEmotions,
    Chat,
    People,
    Notifications,
    AccountCircle,
    FiberManualRecord,
    Logout,
    Menu,
    DashboardCustomize,
    ChatBubbleOutline,
    ChatBubble
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import NavigationSidebar from '../components/common/NavigationSidebar';
import ContentSidebar from '../components/common/ContentSiderbar';
import MainChatPanel from '../components/common/MainChatPanel';
import { useLocation, useParams } from 'react-router-dom';

const MainLayout = () => {
    const [selectedChat, setSelectedChat] = useState('Ls');
    const [message, setMessage] = useState('');
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [mobileChatListOpen, setMobileChatListOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { otherUserId } = useParams();
    const location = useLocation();

    const pageIconMap = [
        { path: '/addFriends', icon: <People /> },
        { path: '/notifications', icon: <Notifications /> },
    ];

    const currentIcon = pageIconMap.find(item =>
        location.pathname.startsWith(item.path)
    )?.icon || <Chat />;

    // const messages = [
    //     { sender: 'Lisa', text: 'Hello', time: '17:00', isOwn: false },
    //     { sender: 'You', text: 'Hello', time: '17:01', isOwn: true },
    //     { sender: 'Lisa', text: 'Hey, just wanted to let you know that the project update has been pushed to the main branch. Make sure to check the documentation because I added a lot of important details about the deployment process, possible issues you might face, and how to fix them. Also, if you have time, please review the UI changes I made yesterday and give me your feedback.', time: '7:00', isOwn: false },
    //     { sender: 'Lisa', text: 'Short message', time: '7:01', isOwn: false },
    //     { sender: 'You', text: 'Yeah, I saw it! Everything looks good. I especially like the new responsive layout adjustments, they make the app feel much smoother on mobile devices. I’ll check the documentation in detail after lunch. By the way, I noticed there’s a small spacing issue in the chat list on iPad resolution — nothing major, but we might want to fix it before release. Also, do you think we should enable dark mode by default for new users?', time: '8:00', isOwn: true },
    //     { sender: 'You', text: 'Hello', time: '17:01', isOwn: true }
    // ];

    const userId = 1;

    const messages = [
        {
            id: 1,
            senderId: otherUserId,
            receiverId: userId,
            content: "Hello",
            type: "text",
            revoked: false,
            seen: true,
            createdAt: "2025-07-25T17:00:00.000Z",
            updatedAt: "2025-07-25T17:00:00.000Z",
            file: null
        },
        {
            id: 2,
            senderId: userId,
            receiverId: otherUserId,
            content: "Hello",
            type: "text",
            revoked: false,
            seen: true,
            createdAt: "2025-07-25T17:01:00.000Z",
            updatedAt: "2025-07-25T17:01:00.000Z",
            file: null
        },
        {
            id: 3,
            senderId: otherUserId,
            receiverId: userId,
            content: "Hey, just wanted to let you know that the project update has been pushed to the main branch. Make sure to check the documentation because I added a lot of important details about the deployment process, possible issues you might face, and how to fix them. Also, if you have time, please review the UI changes I made yesterday and give me your feedback.",
            type: "text",
            revoked: false,
            seen: true,
            createdAt: "2025-07-26T07:00:00.000Z",
            updatedAt: "2025-07-26T07:00:00.000Z",
            file: null
        },
        {
            id: 4,
            senderId: otherUserId,
            receiverId: userId,
            content: "Short message",
            type: "text",
            revoked: false,
            seen: true,
            createdAt: "2025-07-26T07:01:00.000Z",
            updatedAt: "2025-07-26T07:01:00.000Z",
            file: null
        },
        {
            id: 5,
            senderId: userId,
            receiverId: otherUserId,
            content: "Yeah, I saw it! Everything looks good. I especially like the new responsive layout adjustments, they make the app feel much smoother on mobile devices. I’ll check the documentation in detail after lunch. By the way, I noticed there’s a small spacing issue in the chat list on iPad resolution — nothing major, but we might want to fix it before release. Also, do you think we should enable dark mode by default for new users?",
            type: "text",
            revoked: false,
            seen: true,
            createdAt: "2025-07-26T08:00:00.000Z",
            updatedAt: "2025-07-26T08:00:00.000Z",
            file: null
        },
        {
            id: 6,
            senderId: userId,
            receiverId: otherUserId,
            content: "Hello",
            type: "text",
            revoked: false,
            seen: true,
            createdAt: "2025-07-26T17:01:00.000Z",
            updatedAt: "2025-07-26T17:01:00.000Z",
            file: null
        }
    ];


    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', p: isMobile ? 0 : 2 }}>
            {/* Mobile Top Bar */}
            {isMobile && (
                <Paper
                    elevation={2}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        px: 1,
                        zIndex: 1200,
                        borderRadius: '0px',
                        '& .MuiIconButton-root': { color: 'text.secondary' },
                    }}
                >
                    {/* Nút mở Navigation Sidebar */}
                    <IconButton onClick={() => setMobileNavOpen(true)}>
                        <Menu />
                    </IconButton>

                    {/* Nút mở Content Sidebar */}
                    <IconButton onClick={() => setMobileChatListOpen(true)}>
                        {currentIcon}
                    </IconButton>
                    <Box sx={{ flexGrow: 1, ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge
                                badgeContent=' '
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                sx={{ mr: 2, '& .MuiBadge-badge': { fontSize: 8, height: 12, minWidth: 12, backgroundColor: 'status.online' } }}
                            >
                                <Avatar sx={{ backgroundColor: '#e0e0e0' }} />
                            </Badge>
                            <Box>
                                <Typography fontWeight="bold">{selectedChat}</Typography>
                                <Typography variant="caption" color="status.online">Online</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <IconButton><VideoCall /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </Paper>
            )}

            {/* Navigation Sidebar */}
            {isMobile ? (
                <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
                    <NavigationSidebar />
                </Drawer>
            ) : (
                <Box sx={{ mr: 2 }}><NavigationSidebar /></Box>
            )}

            {isMobile ? (
                <Drawer
                    anchor="left"
                    open={mobileChatListOpen}
                    onClose={() => setMobileChatListOpen(false)}
                    slotProps={{
                        paper: {
                            sx: {
                                width: '80%'
                            }
                        }
                    }}
                >
                    <ContentSidebar
                        isMobile={isMobile}
                        otherUserId={otherUserId}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        setMobileChatListOpen={setMobileChatListOpen}
                    />
                </Drawer>
            ) : (
                <Box sx={{ mr: 2 }}>
                    <ContentSidebar
                        isMobile={isMobile}
                        otherUserId={otherUserId}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        setMobileChatListOpen={setMobileChatListOpen}
                    />
                </Box>
            )}

            {/* Main Chat Area */}
            <MainChatPanel
                isMobile={isMobile}
                selectedChat={selectedChat}
                message={message}
                setMessage={setMessage}
                messages={messages}
            />
        </Box>
    );
};

export default MainLayout;
