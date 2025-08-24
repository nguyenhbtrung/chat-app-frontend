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
    ListItem,
    IconButton,
    Divider,
} from '@mui/material';
import {
    Search,
    FiberManualRecord,
    Close,
    PersonAddAlt1,
} from '@mui/icons-material';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useFormatTime from '../hooks/useFormatTime';
import { useTranslation } from 'react-i18next';
import UsersTabContent from '../components/addFriends/usersTab/UsersTabContent';
import NotificationList from '../components/notification/NotificationList';

const Notifications = ({ tab = 0 }) => {

    const {
        isMobile,
        selectedChat,
        setSelectedChat,
        setMobileChatListOpen,
    } = useOutletContext();

    const { t } = useTranslation('notifications');
    const { otherUserId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();



    const [timeUpdateTick, setTimeUpdateTick] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdateTick((tick) => tick + 1);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = useFormatTime();

    const onlineUsers = [
        {
            id: 5,
            type: 'friend_request_accepted',
            content: 'friendRequestAccepted',
            isRead: false,
            createdAt: '2025-08-22T20:58:54.000Z',
            sender: {
                id: 1,
                userName: "johncena",
                displayName: "John Cena",
                avatarUrl: null,
            },
        },
        {
            id: 4,
            type: 'friend_request_rejected',
            content: 'friendRequestRejected',
            isRead: false,
            createdAt: '2025-08-22T19:58:54.000Z',
            sender: {
                id: 2,
                userName: "tokuda",
                displayName: "Tokuda",
                avatarUrl: null,
            },
        },
        {
            id: 3,
            type: 'friend_request_accepted',
            content: 'friendRequestAccepted',
            isRead: false,
            createdAt: '2025-08-21T20:58:54.000Z',
            sender: {
                id: 3,
                userName: "akira",
                displayName: "Akira",
                avatarUrl: null,
            },
        },
        {
            id: 2,
            type: 'friend_request_rejected',
            content: 'friendRequestRejected',
            isRead: false,
            createdAt: '2025-08-20T20:58:54.000Z',
            sender: {
                id: 4,
                userName: "putin",
                displayName: "Putin",
                avatarUrl: null,
            },
        },
        {
            id: 1,
            type: 'friend_request_accepted',
            content: 'friendRequestAccepted',
            isRead: false,
            createdAt: '2025-08-19T20:58:54.000Z',
            sender: {
                id: 5,
                userName: "trump",
                displayName: "Trump",
                avatarUrl: null,
            },
        },
    ];

    return (
        <>
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    {t('title')}
                </Typography>
            </Box>
            <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                <NotificationList
                    notifications={onlineUsers}
                    title={t('subTitle.new')}
                />
                <Divider variant="middle" sx={{ my: 2, backgroundColor: '#e0e0e0' }} />
                <NotificationList
                    notifications={onlineUsers}
                    title={t('subTitle.before')}
                />
            </List>
        </>
    );

};

export default Notifications;
