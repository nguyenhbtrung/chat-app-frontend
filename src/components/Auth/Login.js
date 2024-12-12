import React, { useState } from 'react';
import { login } from '../../services/auth';


const Login = () => {
    const [username, setInputUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setInputUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );

};

export default Login;