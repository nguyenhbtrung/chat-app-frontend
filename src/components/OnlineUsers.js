import React, { useEffect, useState } from 'react';
import { getOnlineUsers } from '../services/user';

const OnlineUsers = ({ token, connectToPeer }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getOnlineUsers(token);
                setUsers(data);
            } catch (err) {
                console.error('Failed to fetch online users', err);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div>
            <h2>Online Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username}{' '}
                        <button onClick={() => connectToPeer(user.id)}>Connect</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OnlineUsers;