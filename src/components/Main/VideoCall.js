import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

const VideoCall = ({ isAddTrack, remoteUsername, onEndCall, remoteStream, addLocalTracks }) => {
    const userVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        if (isAddTrack) return;
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                userVideoRef.current.srcObject = stream;
                isAddTrack = true;
                addLocalTracks(stream);
            })
            .catch(err => {
                console.error("Error accessing user media: ", err);
            });
    }, []);

    useEffect(() => {
        if (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handleEndCall = () => {
        if (userVideoRef.current && userVideoRef.current.srcObject) {
            const tracks = userVideoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }

        if (onEndCall) onEndCall();
    };

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
                    height: '60%',
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
                    <video ref={userVideoRef} autoPlay style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
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
                    <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
                </Box>
            </Box>
            <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={handleEndCall}
            >
                End Call
            </Button>
        </Box>
    );
};

export default VideoCall;
