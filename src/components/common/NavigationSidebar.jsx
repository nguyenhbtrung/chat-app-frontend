import {
    Box,
    IconButton,
    Paper,
    Tooltip
} from '@mui/material';
import {
    Chat,
    People,
    Notifications,
    AccountCircle,
    Logout,
} from '@mui/icons-material';
import AppLogo from '../../assets/appLogo.svg?react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const NavigationSidebar = ({ setOpenProfile }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const { otherUserId } = useParams();

    // Kiểm tra route selected
    const isSelected = (path) => location.pathname.startsWith(path);

    // Style chung cho IconButton
    const getIconButtonSx = (selected) => ({
        width: 44,
        height: 44,
        borderRadius: 1,
        color: selected ? 'text.primary' : 'text.secondary',
        bgcolor: selected ? 'navigation.selected' : 'transparent',
        '&:hover': {
            bgcolor: 'navigation.selected',
        },
        '&:active': {
            boxShadow: 'none'
        }
    });

    return (
        <Paper
            elevation={4}
            sx={{
                width: 70,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 3,
                py: 2,
                height: '100%',
            }}
        >
            {/* Logo */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: 'logo.background',
                        p: 1,
                        // display: 'flex',
                        // alignItems: 'center',
                        // justifyContent: 'center'
                    }}
                >
                    <Box sx={{ color: 'logo.main' }}>
                        <AppLogo style={{ width: 32, height: 28 }} />
                    </Box>
                </Box>

                <Tooltip title={t('tooltip.chats')} placement="right">
                    <IconButton
                        onClick={() => navigate(`/${otherUserId || ''}`)}
                        sx={getIconButtonSx(location.pathname === '/' || location.pathname === `/${otherUserId}` || isSelected('/friends'))}
                    >
                        <Chat />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t('tooltip.addFriends')} placement="right">
                    <IconButton
                        onClick={() => navigate(`/addFriends/${otherUserId || ''}`)}
                        sx={getIconButtonSx(isSelected('/addFriends'))}
                    >
                        <People />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t('tooltip.notifications')} placement="right">
                    <IconButton
                        onClick={() => navigate(`/notifications/${otherUserId || ''}`)}
                        sx={getIconButtonSx(isSelected('/notifications'))}
                    >
                        <Notifications />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Account & Logout */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Tooltip title={t('tooltip.account')} placement="right">
                    <IconButton
                        onClick={() => setOpenProfile(true)}
                        sx={getIconButtonSx(false)}
                    >
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('tooltip.logout')} placement="right">
                    <IconButton sx={getIconButtonSx(false)}>
                        <Logout />
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};

export default NavigationSidebar;
