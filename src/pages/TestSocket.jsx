import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

function TestSocket() {
    const [messages, setMessages] = useState([]);
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('✅ connected to socket server');
            registerUserSocket();
        });

        socket.on('connect_error', (err) => {
            console.error('❌ connect_error:', err.message);
        });

        socket.on('disconnect', (reason) => {
            console.warn('🔌 disconnected:', reason);
        });



        // socket.on('chat message', (msg) => {
        //     setMessages((prev) => [...prev, msg]);
        // });

        return () => {
            // socket.off('chat message');
            socket.disconnect();
        };
    }, []);

    const registerUserSocket = () => {
        socket.emit('register', localStorage.getItem('userId') || '');
    }

    const sendMessage = () => {
        socket.emit('chat message', 'Hello from client');
    };

    return (
        <div>
            <h3>Messages:</h3>
            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
            <button onClick={() => navigate('/test')}>Send</button>
        </div>
    );
}

export default TestSocket;
