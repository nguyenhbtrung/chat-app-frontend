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



    const [timeUpdateTick, setTimeUpdateTick] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdateTick((tick) => tick + 1);
        }, 60000);
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
                    placeholder={t('addFriends.searchPlaceholder')}
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
            <UsersTabContent />
        </>
    );

};

export default AddFriend;
