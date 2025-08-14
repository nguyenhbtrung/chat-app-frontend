import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Paper,
    Chip,
    Badge,
    TextField
} from '@mui/material';
import {
    VideoCall,
    MoreVert,
    AttachFile,
    Send,
    EmojiEmotions
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Hàm format giờ và ngày
const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
};

// Hàm nhóm messages theo ngày
const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, msg) => {
        const dateKey = formatDate(msg.createdAt);
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(msg);
        return groups;
    }, {});
};

const MainChatPanel = ({
    isMobile,
    selectedChat,
    message,
    setMessage,
    messages
}) => {
    const userId = 1; // user hiện tại
    // Chuyển đổi mockdata mới sang dạng cũ UI dùng
    const normalizedMessages = messages.map(m => ({
        ...m,
        isOwn: m.senderId === userId,
        text: m.content,
        time: formatTime(m.createdAt)
    }));

    // Nhóm theo ngày
    const grouped = groupMessagesByDate(normalizedMessages);
    const sortedDates = Object.keys(grouped).sort((a, b) => {
        const da = new Date(a.split('/').reverse().join('-'));
        const db = new Date(b.split('/').reverse().join('-'));
        return da - db;
    });

    const { t } = useTranslation('chat');

    return (
        <Paper
            elevation={4}
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: isMobile ? 0 : 3,
                overflow: 'hidden',
                height: '100%',
                mt: 0
            }}
        >
            {/* Chat Header or buffer box*/}
            {isMobile ? (
                <Box height={56}></Box>
            ) : (
                <Box sx={{
                    p: 2,
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '& .MuiIconButton-root': { color: 'text.secondary' }
                }}>
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
                            <Typography variant="caption" color="status.online">{t('chat.status.online')}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton><VideoCall /></IconButton>
                        <IconButton><MoreVert /></IconButton>
                    </Box>
                </Box>
            )}

            {/* Chat Messages */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, backgroundColor: 'chat.background' }}>
                {sortedDates.map(date => (
                    <React.Fragment key={date}>
                        <Box sx={{ textAlign: 'center', my: 2 }}>
                            <Chip label={date} size="small" sx={{ backgroundColor: 'chat.chip', color: 'text.secondary' }} />
                        </Box>
                        {grouped[date].map((msg, i) => (
                            <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.isOwn ? 'flex-end' : 'flex-start', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: '70%' }}>
                                    {!msg.isOwn && <Avatar sx={{ width: 32, height: 32, mr: 1, backgroundColor: '#e0e0e0' }} />}
                                    <Box>
                                        <Paper sx={{
                                            p: 1.5,
                                            backgroundColor: msg.isOwn ? 'chat.bubble.user' : 'chat.bubble.peer',
                                            color: msg.isOwn ? 'white' : 'text.primary',
                                            borderRadius: msg.isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                            maxWidth: '500px'
                                        }}>
                                            <Typography variant="body2">{msg.text}</Typography>
                                        </Paper>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mt: 0.5, display: 'block', textAlign: msg.isOwn ? 'right' : 'left' }}
                                        >
                                            {msg.time}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </React.Fragment>
                ))}
            </Box>

            {/* Chat Input */}
            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ color: 'text.secondary' }}><AttachFile /></IconButton>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Aa"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ mx: 1 }}
                        slotProps={{
                            input: {
                                sx: { borderRadius: 3, backgroundColor: 'input.background' }
                            }
                        }}
                    />
                    <IconButton sx={{ color: 'text.secondary' }}><EmojiEmotions /></IconButton>
                    <IconButton sx={{ color: 'chat.bubble.user' }}><Send /></IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default MainChatPanel;
