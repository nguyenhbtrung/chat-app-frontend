import React, { useState } from "react";
import { Box, Typography, Button, Input } from "@mui/material";

const FileTransfer = ({ sendFile }) => {
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
            <Button variant="contained" color="primary" onClick={handleSendFile}>
                Send File
            </Button>
        </Box>
    );
};

export default FileTransfer;
