import React, { useState } from 'react';

const FileTransfer = ({ sendFile }) => {
    const [file, setFile] = useState(null);

    const handleSendFile = () => {
        if (file) {
            sendFile(file);
        }
    };

    return (
        <div>
            <h2>File Transfer</h2>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleSendFile}>Send File</button>
        </div>
    );
};

export default FileTransfer;
