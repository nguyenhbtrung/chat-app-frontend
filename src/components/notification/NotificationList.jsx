import {
    Typography,
    Avatar,
    ListItemAvatar,
    ListItemText,
    ListItem,
    IconButton,
    Tooltip,
    Box,
    Button,
} from '@mui/material';
import {
    AccessTime,
    CancelRounded,
    CheckCircle,
    Close,
    PersonAddAlt1,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useFormatTime from '../../hooks/useFormatTime';

const NotificationList = ({ notifications, title }) => {
    const { t } = useTranslation('notifications');
    const formatTime = useFormatTime();

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ my: 2, ml: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Button
                    variant="text"
                    // onClick={onDeleteAll}
                    sx={{
                        p: 0,
                        mr: '8px',
                        mt: '8px',
                        '&:focus': { outline: 'none' },
                        color: 'text.tertiary',
                        '&:hover': { color: 'info.main', backgroundColor: 'transparent' },
                    }}
                >
                    {t('button.deleteAll')}
                </Button>
            </Box>
            {notifications.map((notification) => (
                <ListItem
                    key={notification.id}
                    alignItems="flex-start"
                    secondaryAction={
                        <>
                            {notification.type === 'friend_request_accepted' &&
                                <CheckCircle color='success' />
                            }
                            {notification.type === 'friend_request_rejected' &&
                                <CancelRounded color='error' />
                            }
                        </>
                    }
                >
                    <ListItemAvatar>
                        <Avatar src={notification.sender.avatarUrl || undefined} alt={notification.sender.displayName} sx={{ backgroundColor: '#e0e0e0' }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant='h6' fontWeight='bold'>
                                {notification.sender.displayName || notification.sender.userName}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {t([`content.${notification.content}`, `content.default`])}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                    <AccessTime sx={{ fontSize: 14 }} />
                                    {formatTime(notification.createdAt)}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>

            ))
            }
        </>
    );
};

export default NotificationList;