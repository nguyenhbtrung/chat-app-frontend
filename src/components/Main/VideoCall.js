import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

const VideoCall = ({ username, remoteUsername, onEndCall }) => {
    const userVideoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                userVideoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing user media: ", err);
            });
    }, []);

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Video Call with {remoteUsername}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '80%',
                    height: '50%',
                    backgroundColor: '#000',
                    borderRadius: 4,
                }}
            >
                <Box
                    sx={{
                        width: '49%',
                        height: '100%',
                        backgroundColor: '#111',
                        borderRadius: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <video ref={userVideoRef} autoPlay style={{ width: '95%', height: '95%', borderRadius: '4px' }} />
                </Box>
                <Box
                    sx={{
                        width: '49%',
                        height: '100%',
                        backgroundColor: '#222',
                        borderRadius: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography color="white">{remoteUsername}'s Video Stream</Typography>
                </Box>
            </Box>
            <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={onEndCall}
            >
                End Call
            </Button>
        </Box>
    );
};

export default VideoCall;
