import { useState } from 'react';
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
    Badge,
    Paper,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Search,
    FiberManualRecord,
} from '@mui/icons-material';
import { Outlet } from 'react-router-dom';

const ContentSidebar = ({
    isMobile,
    otherUserId,
    selectedChat,
    setSelectedChat,
    setMobileChatListOpen,
}) => {

    return (
        <Paper
            elevation={4}
            sx={{
                width: isMobile ? '100%' : 400,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                height: '100%',
            }}
        >
            <Outlet context={{
                isMobile,
                otherUserId,
                selectedChat,
                setSelectedChat,
                setMobileChatListOpen,
            }}
            />
        </Paper>
    );

};

export default ContentSidebar;