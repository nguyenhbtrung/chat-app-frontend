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
// import { ReactComponent as AppLogo } from '../../assets/appLogo.svg?react';
import { useNavigate } from 'react-router-dom';

const NavigationSidebar = () => {
    const navigate = useNavigate();

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
            {/* Khu vực logo */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, '& .MuiIconButton-root': { color: 'text.secondary' } }}>
                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: 'logo.background',
                        p: 1,
                    }}
                >
                    {/* <Box
                        component="img"
                        src={appLogo}
                        alt="App Logo"
                        sx={{
                            width: 28,
                            height: 28,
                            filter: 'brightness(0) invert(1)',
                        }}
                    /> */}
                    <Box sx={{ color: 'logo.main' }}>
                        <AppLogo style={{ width: 32, height: 28 }} />
                    </Box>
                </Box>

                <Tooltip title="Chats" placement="right">
                    <IconButton><Chat /></IconButton>
                </Tooltip>
                <Tooltip title="Friends" placement="right">
                    <IconButton onClick={() => navigate('/fr')}><People /></IconButton>
                </Tooltip>
                <Tooltip title="Notifications" placement="right">
                    <IconButton><Notifications /></IconButton>
                </Tooltip>
            </Box>

            {/* Khu vực account & logout */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, '& .MuiIconButton-root': { color: 'text.secondary' } }}>
                <Tooltip title="Account" placement="right">
                    <IconButton><AccountCircle /></IconButton>
                </Tooltip>
                <Tooltip title="Logout" placement="right">
                    <IconButton><Logout /></IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
}

export default NavigationSidebar;
