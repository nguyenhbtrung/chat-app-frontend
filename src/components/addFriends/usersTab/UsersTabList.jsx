import {
    Typography,
    Avatar,
    ListItemAvatar,
    ListItemText,
    ListItem,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Close,
    PersonAddAlt1,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const UsersTabsList = ({ users, title }) => {
    const { t } = useTranslation('addFriends');
    return (
        <>
            <Typography variant="h6" fontWeight="bold" sx={{ m: 2 }}>
                {title}
            </Typography>
            {users.map((user) => (
                <ListItem
                    key={user.id}
                    secondaryAction={
                        user.requestSent ? (
                            <Tooltip title={t('addFriends.button.cancelRequest')} placement="right">
                                <IconButton sx={{ color: 'text.secondary' }} edge="end">
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title={t('addFriends.button.addFriend')} placement="right">
                                <IconButton color='info' edge="end">
                                    <PersonAddAlt1 />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                >
                    <ListItemAvatar>
                        <Avatar src={user.avatarUrl || undefined} alt={user.displayName} sx={{ backgroundColor: '#e0e0e0' }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.displayName || user.userName}
                        slotProps={{
                            primary: {
                                // fontWeight: "bold",
                            },
                        }}
                    />
                </ListItem>

            ))
            }
        </>
    );
};

export default UsersTabsList;