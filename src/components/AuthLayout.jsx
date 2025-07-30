import { Box, Paper, Typography } from '@mui/material';
import appLogo from '../assets/file.svg';

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* <Box
                    sx={{
                        border: '2px solid',
                        borderRadius: 1,
                        px: 1.5,
                        py: 0.5,
                        mr: 1,
                        color: 'primary.main'
                    }}
                > */}
                <img src={appLogo} width={50} alt="App logo" />
                {/* </Box> */}
                <Typography sx={{ color: 'primary.main', ml: '16px' }} variant="h6" fontWeight={600}>
                    Chat-Call
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        border: '2px solid',
                        borderColor: 'divider',
                        borderRadius: 4,
                        p: 4,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        {subtitle}
                    </Typography>

                    {children}
                </Paper>
            </Box>
        </Box>
    );
}
