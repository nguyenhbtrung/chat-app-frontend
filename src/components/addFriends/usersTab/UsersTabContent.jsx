import {
    Typography,
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,
    ListItem,
    IconButton,
    Divider,
} from '@mui/material';
import {
    Close,
    PersonAddAlt1,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import UsersTabsList from './UsersTabList';

const UsersTabContent = () => {
    const { t } = useTranslation('addFriends');

    const onlineUsers = [
        { id: 1, userName: "johncena", displayName: "John Cena", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 2, userName: "tokuda", displayName: "Tokuda", avatarUrl: null, isFriend: true, requestSent: false },
        { id: 3, userName: "akira", displayName: "Akira", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 4, userName: "putin", displayName: "Putin", avatarUrl: null, isFriend: true, requestSent: false },
        { id: 5, userName: "trump", displayName: "Trump", avatarUrl: null, isFriend: false, requestSent: false },
    ];

    const allUsers = [
        { id: 1, userName: "johncena", displayName: "John Cena", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 2, userName: "tokuda", displayName: "Tokuda", avatarUrl: null, isFriend: true, requestSent: false },
        { id: 3, userName: "akira", displayName: "Akira", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 4, userName: "putin", displayName: "Putin", avatarUrl: null, isFriend: true, requestSent: false },
        { id: 5, userName: "trump", displayName: "Trump", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 6, userName: "akira", displayName: "Akira", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 7, userName: "putin", displayName: "Putin", avatarUrl: null, isFriend: true, requestSent: false },
        { id: 8, userName: "trump", displayName: "Trump", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 9, userName: "akira", displayName: "Akira", avatarUrl: null, isFriend: false, requestSent: false },
        { id: 10, userName: "putin", displayName: "Putin", avatarUrl: null, isFriend: true, requestSent: false },
        { id: 11, userName: "trump", displayName: "Trump", avatarUrl: null, isFriend: false, requestSent: false },
    ];

    return (
        <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
            <UsersTabsList
                users={onlineUsers}
                title={t('addFriends.subTitle.onlineUsers')}
            />
            <Divider variant="middle" sx={{ my: 2, backgroundColor: '#e0e0e0' }} />
            <UsersTabsList
                users={allUsers}
                title={t('addFriends.subTitle.otherUsers')}
            />
        </List>
    );
};

export default UsersTabContent;