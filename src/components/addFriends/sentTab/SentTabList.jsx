import {
    Typography,
    Avatar,
    ListItemAvatar,
    ListItemText,
    ListItem,
    IconButton,
    Tooltip,
    Button,
    Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const SentTabsList = ({ requests, title, iconButton, iconColor, buttonName }) => {
    const { t } = useTranslation('addFriends');
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
                    {t('addFriends.button.deleteAll')}
                </Button>
            </Box>
            {requests?.map((request) => (
                <ListItem
                    key={request.userId}
                    secondaryAction={
                        <Tooltip title={buttonName} placement="right">
                            <IconButton sx={{ color: iconColor }} edge="end">
                                {iconButton}
                            </IconButton>
                        </Tooltip>
                    }
                >
                    <ListItemAvatar>
                        <Avatar src={request.avatarUrl || undefined} alt={request.displayName} sx={{ backgroundColor: '#e0e0e0' }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={request.displayName || request.userName}
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

export default SentTabsList;