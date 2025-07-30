import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from 'chat-app-zod-schema';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
    };

    return (
        <AuthLayout
            title="Sign In"
            subtitle="Ready to start chatting and video calling?"
        >
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('userName')}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <Box textAlign="right" mt={1} mb={3}>
                    <Typography variant="body2" fontWeight={500}>
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                            Forgot password ?
                        </Link>
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 2, mb: 2 }}
                    type="submit"
                >
                    Sign in
                </Button>

                <Typography variant="body2" align="center">
                    Don’t have an account?{' '}
                    <Link to="/signup" style={{ fontWeight: 'bold' }}>
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    );
}
