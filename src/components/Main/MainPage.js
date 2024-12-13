import React, { useState, useEffect } from "react";
import Login from "../Auth/Login";
import useWebRTC from "../../hooks/useWebRTC";
import OnlineUsers from "./OnlineUsers";
import FileTransfer from "./FileTransfer";
import { io } from "socket.io-client";

const MainPage = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [socket, setSocket] = useState(null);
    const [peerId, setPeerId] = useState(""); // Trạng thái lưu Peer ID

    useEffect(() => {
        const newSocket = io("http://localhost:8080");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setPeerId(newSocket.id); // Cập nhật Peer ID sau khi kết nối
            console.log("Connected with Peer ID:", newSocket.id);
        });

        return () => {
            console.log("Disconnecting socket...");
            newSocket.disconnect();
        };
    }, []);

    const { createPeerConnection, sendOffer, sendFile, receivedFiles } = useWebRTC(socket);

    const connectToPeer = (userId) => {
        createPeerConnection((data) => {
            console.log("Received file data:", data);
        });
        sendOffer(userId);
    };

    return (
        <div>
            <h1>Welcome, {username}</h1>
            {socket && peerId && ( // Hiển thị Peer ID nếu đã kết nối
                <p>Your Peer ID: <strong>{peerId}</strong></p>
            )}
            {socket && (
                <OnlineUsers
                    token={token}
                    connectToPeer={connectToPeer}
                    socket={socket}
                />
            )}
            <FileTransfer sendFile={sendFile} />
            <div>
                <h3>Received Files</h3>
                <ul>
                    {receivedFiles.map((file, index) => (
                        <li key={index}>
                            <a href={file.url} download={file.name}>
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
