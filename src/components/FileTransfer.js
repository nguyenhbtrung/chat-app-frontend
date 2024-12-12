import React, { useState } from 'react';

const FileTransfer = ({ peerConnection }) => {
    const [file, setFile] = useState(null);

    const handleSendFile = () => {
        if (!file) return;
        const reader = new FileReader();

        reader.onload = () => {
            const dataChannel = peerConnection.createDataChannel('fileTransfer');
            dataChannel.send(reader.result);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h2>File Transfer</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSendFile}>Send File</button>
        </div>
    );
};

export default FileTransfer;
