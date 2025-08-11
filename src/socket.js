import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(URL, {
    autoConnect: false,
    transports: ['polling', 'websocket'],
    auth: {
        token: localStorage.getItem("accessToken") || "",
    },
});
