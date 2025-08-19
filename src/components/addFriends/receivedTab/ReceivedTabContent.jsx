import { Block, Cancel, Check, CheckCircle, Close, PersonAddAlt1 } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ReceivedTabContent = () => {
    const { t } = useTranslation('addFriends');

    const requests = [
        { userId: 1, userName: "johncena", displayName: "John Cena", avatarUrl: null, status: 'pending' },
        { userId: 2, userName: "tokuda", displayName: "Tokuda", avatarUrl: null, status: 'pending' },
        { userId: 3, userName: "akira", displayName: "Akira", avatarUrl: null, status: 'accepted' },
        { userId: 4, userName: "putin", displayName: "Putin", avatarUrl: null, status: 'blocked' },
        { userId: 5, userName: "trump", displayName: "Trump", avatarUrl: null, status: 'rejected' },
    ];

    return (
        <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ my: 2, ml: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {t('addFriends.subTitle.requestsReceived')}
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
            {requests.map((request) => (
                <ListItem
                    key={request.userId}
                    secondaryAction={
                        request.status === 'pending' ? (
                            <Box display="flex" gap={1}>
                                <Tooltip title={t('addFriends.button.acceptRequest')} placement="top">
                                    <IconButton
                                        sx={{ color: 'success.main' }}
                                        edge="end"
                                        onClick={() => console.log("Accept", request.userId)}
                                    >
                                        <Check />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t('addFriends.button.rejectRequest')} placement="top">
                                    <IconButton
                                        sx={{ color: 'error.main' }}
                                        edge="end"
                                        onClick={() => console.log("Reject", request.userId)}
                                    >
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        ) : (
                            <Chip
                                label={t(`addFriends.status.${request.status}`)}
                                size="small"
                                icon={
                                    request.status === 'accepted' ? (
                                        <CheckCircle />
                                    ) : request.status === 'rejected' ? (
                                        <Cancel />
                                    ) : (
                                        <Block />
                                    )
                                }
                                sx={{
                                    fontWeight: 500,
                                    borderRadius: '8px',
                                    ml: 1,
                                    '& .MuiChip-icon': {
                                        fontSize: '18px',
                                        color:
                                            request.status === 'accepted'
                                                ? 'success.onBackground'
                                                : request.status === 'rejected'
                                                    ? 'error.onBackground'
                                                    : 'text.secondary',
                                    },
                                    backgroundColor:
                                        request.status === 'accepted'
                                            ? 'success.background'
                                            : request.status === 'rejected'
                                                ? 'error.background'
                                                : 'tex.disabled',
                                    color:
                                        request.status === 'accepted'
                                            ? 'success.onBackground'
                                            : request.status === 'rejected'
                                                ? 'error.onBackground'
                                                : 'text.secondary',
                                }}
                            />

                        )
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

            ))}
        </List>
    );
};

export default ReceivedTabContent;