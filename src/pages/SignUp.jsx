import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Person,
    Email,
    Lock,
} from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/extendedRegisterSchema';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
    };

    return (
        <AuthLayout
            title="Sign Up"
            subtitle="Just a few seconds to connect with your friends!"
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
                    label="Email"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
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

                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type={showConfirm ? 'text' : 'password'}
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
                                        onClick={() => setShowConfirm((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 2, my: 2 }}
                    type='submit'
                >
                    Sign up
                </Button>

                <Typography variant="body2" align="center">
                    You already have an account?{' '}
                    <Link to="/signin" style={{ fontWeight: 'bold' }}>
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    );
}
