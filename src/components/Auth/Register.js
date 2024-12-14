import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Alert } from "@mui/material";
import { register } from "../../services/auth"; // API đăng ký cần được định nghĩa

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await register(username, password);
            setSuccess("Registration successful. You can now login.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error("Register failed", err);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: 8 }}>
            <Typography variant="h4" gutterBottom align="center">
                Register
            </Typography>
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                    {success}
                </Alert>
            )}
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="Username"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Button
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 1 }}
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
