import React, { useState } from "react";
import { Box, Typography, Button, Input, LinearProgress } from "@mui/material";

const FileTransfer = ({ sendFile, progress }) => {
    const [file, setFile] = useState(null);

    const handleSendFile = () => {
        if (file) sendFile(file);
    };

    return (
        <Box sx={{ marginTop: 2, padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                File Transfer
            </Typography>
            <Input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                sx={{ marginBottom: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendFile}
                sx={{ marginBottom: 2 }}
                disabled={progress > 0 && progress < 100} // Vô hiệu hóa khi đang gửi
            >
                Send File
            </Button>
            {progress > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" gutterBottom>
                        Progress: {Math.round(progress)}%
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
            )}
        </Box>
    );
};

export default FileTransfer;
