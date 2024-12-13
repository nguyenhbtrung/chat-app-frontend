import React, { useEffect, useState } from "react";

const OnlineUsers = ({ token, connectToPeer, socket }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        if (!socket) {
            console.log("Socket is not defined yet.");
            return;
        }
        console.log("Socket is defined:", socket);
        const handleConnect = () => {
            console.log("Connected to socket server:", socket.id);

            // Đăng ký username (thay username bằng giá trị thực tế)
            const username = localStorage.getItem("username");
            socket.emit("register", username);
        };

        const handleActiveUsers = (activeUsers) => {
            setUsers(activeUsers.filter(([id]) => id !== socket.id)); // Loại bỏ chính mình
        };

        // Khi component mount
        socket.on("connect", handleConnect);
        // Nhận danh sách người dùng online
        socket.on("active-users", handleActiveUsers);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("active-users", handleActiveUsers);
        };
    }, [socket]);

    return (
        <div>
            <h2>Online Users</h2>
            <ul>
                {users.map(([id, user]) => (
                    <li key={id}>
                        {user.username} (Peer ID: {id}){" "}
                        <button onClick={() => connectToPeer(id)}>Connect</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OnlineUsers;
