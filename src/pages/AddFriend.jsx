import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,
    TextField,
    InputAdornment,
    Badge,
    Tabs,
    Tab,
    ListItemButton,
} from '@mui/material';
import {
    Search,
    FiberManualRecord,
} from '@mui/icons-material';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useFormatTime from '../hooks/useFormatTime';
import { useTranslation } from 'react-i18next';

const AddFriend = ({ tab = 0 }) => {

    const {
        isMobile,
        selectedChat,
        setSelectedChat,
        setMobileChatListOpen,
    } = useOutletContext();

    const { t } = useTranslation('addFriends');
    const { otherUserId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const chatList = [
        {
            id: 1,
            senderId: 2,
            receiverId: 1,
            content: "Hello",
            type: "text",
            createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 0,
            otherUser: {
                id: 2,
                displayName: "Alex",
                userName: "alex",
                avatarUrl: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg",
                becomeFriendAt: "2025-08-07T18:50:48.000Z"
            },
            online: true
        },
        {
            id: 2,
            senderId: 3,
            receiverId: 1,
            content: "You: Hello",
            type: "text",
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 1,
            otherUser: {
                id: 3,
                displayName: "Ls",
                userName: "ls",
                avatarUrl: null,
                becomeFriendAt: "2025-08-07T18:50:48.000Z"
            },
            online: true
        },
        {
            id: 3,
            senderId: 4,
            receiverId: 1,
            content: "Hello hello",
            type: "text",
            createdAt: "2025-08-12T11:30:00.000Z",
            revoked: 0,
            seen: 0,
            otherUser: {
                id: 4,
                displayName: "Fen Chen",
                userName: "fenchen",
                avatarUrl: null,
                becomeFriendAt: "2025-08-07T18:50:48.000Z"
            },
            online: true
        },
        {
            id: 4,
            senderId: 5,
            receiverId: 1,
            content: "Shhhhhhhhhhhhhh...",
            type: "text",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 0,
            otherUser: {
                id: 5,
                displayName: "Peter Parker",
                userName: "peterparker",
                avatarUrl: null,
                becomeFriendAt: "2025-08-07T18:50:48.000Z"
            },
            online: false
        },
        {
            id: 5,
            senderId: 6,
            receiverId: 1,
            content: "Hello, how are you? Le...",
            type: "text",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 1,
            otherUser: {
                id: 6,
                displayName: "Cristiano Ronaldo",
                userName: "ronaldo",
                avatarUrl: null,
                becomeFriendAt: "2025-08-07T18:50:48.000Z"
            },
            online: true
        },
        {
            id: 6,
            senderId: 7,
            receiverId: 1,
            content: "You: Hello",
            type: "text",
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 1,
            otherUser: {
                id: 7,
                displayName: "Lionel Messi",
                userName: "messi",
                avatarUrl: null,
                becomeFriendAt: "2025-08-07T18:50:48.000Z"
            },
            online: false
        },
        // Tin nhắn cách đây 2 tháng
        {
            id: 7,
            senderId: 8,
            receiverId: 1,
            content: "Long time no see!",
            type: "text",
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 1,
            otherUser: {
                id: 8,
                displayName: "Bruce Wayne",
                userName: "batman",
                avatarUrl: null,
                becomeFriendAt: "2024-12-01T10:00:00.000Z"
            },
            online: false
        },
        // Tin nhắn cách đây 8 tháng
        {
            id: 8,
            senderId: 9,
            receiverId: 1,
            content: "Are you free next week?",
            type: "text",
            createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 0,
            otherUser: {
                id: 9,
                displayName: "Clark Kent",
                userName: "superman",
                avatarUrl: null,
                becomeFriendAt: "2024-05-01T09:00:00.000Z"
            },
            online: true
        },
        // Tin nhắn cách đây 2 năm
        {
            id: 9,
            senderId: 10,
            receiverId: 1,
            content: "Happy New Year!",
            type: "text",
            createdAt: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
            revoked: 0,
            seen: 1,
            otherUser: {
                id: 10,
                displayName: "Diana Prince",
                userName: "wonderwoman",
                avatarUrl: null,
                becomeFriendAt: "2023-01-01T00:00:00.000Z"
            },
            online: false
        }
    ];


    const [timeUpdateTick, setTimeUpdateTick] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdateTick((tick) => tick + 1);
        }, 60000); // update every 1 minute
        return () => clearInterval(interval);
    }, []);

    const formatTime = useFormatTime();

    const changeTab = (val) => {
        switch (val) {
            case 0:
                navigate(`/addFriends/${otherUserId || ''}`);
                break;

            case 1:
                navigate(`/addFriends/sent/${otherUserId || ''}`);
                break;

            case 2:
                navigate(`/addFriends/received/${otherUserId || ''}`);
                break;
        }
    };

    return (
        <>
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    {t('addFriends.title')}
                </Typography>
                <Tabs value={tab} onChange={(e, val) => changeTab(val)} sx={{ mb: 2 }}>
                    <Tab label={t('addFriends.tab.users')} />
                    <Tab label={t('addFriends.tab.sent')} />
                    <Tab label={t('addFriends.tab.received')} />
                </Tabs>
                <TextField
                    fullWidth
                    size="small"
                    placeholder={t('chat.searchPlaceholder')}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 3, backgroundColor: 'input.background' }
                        }
                    }}
                />
            </Box>
            <List sx={{ flex: 1, overflow: 'auto', p: 0, }}>
                {chatList.map((chat) => (
                    <ListItemButton
                        key={chat.id}
                        onClick={() => {
                            setSelectedChat(chat.otherUser.displayName || chat.otherUser.userName);
                            if (isMobile) setMobileChatListOpen(false);
                            const segments = location.pathname.split("/");
                            segments[segments.length - 1] = chat.otherUser.id;
                            const newPath = segments.join("/");
                            navigate(newPath);
                        }}
                        sx={{
                            backgroundColor: parseInt(otherUserId) === chat.otherUser.id ? 'input.background' : 'transparent',
                            '&:hover': { backgroundColor: 'input.background' },
                            py: 1.5
                        }}
                    >
                        <ListItemAvatar>
                            <Badge
                                badgeContent=' '
                                invisible={!chat.online}
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                sx={{ '& .MuiBadge-badge': { fontSize: 8, height: 12, minWidth: 12, backgroundColor: 'status.online' } }}
                            >
                                <Avatar src={chat.otherUser.avatarUrl} sx={{ width: 45, height: 45, backgroundColor: '#e0e0e0' }} />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography
                            primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography fontWeight="bold" sx={{ fontSize: '0.95rem' }}>{chat.otherUser.displayName || chat.otherUser.userName}</Typography>
                                    <Typography variant="caption" color="text.secondary">{timeUpdateTick && formatTime(chat.createdAt)}</Typography>
                                </Box>
                            }
                            secondary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '160px',
                                            fontWeight: chat.seen === 0 ? 'bold' : 'normal'
                                        }}
                                    >
                                        {chat.content}
                                    </Typography>
                                    {chat.seen === 0 && (
                                        <FiberManualRecord sx={{ color: 'primary.main', fontSize: 12 }} />
                                    )}
                                </Box>
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
        </>
    );

};

export default AddFriend;
