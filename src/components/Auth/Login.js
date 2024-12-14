import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const [username, setInputUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("username", data.username);

            onLoginSuccess(); // Gọi hàm để cập nhật trạng thái xác thực
            navigate("/");    // Điều hướng tới MainPage
        } catch (err) {
            console.error("Login failed", err);
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
