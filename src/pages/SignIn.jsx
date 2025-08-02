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
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const { handleApiError } = useApiErrorHandler();
    const { t } = useTranslation('auth');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await login(data);
            console.log(">>>check login: ", res);
            toast.success(t('api.success.SIGN_IN', { ns: 'api' }));
        } catch (error) {
            handleApiError(error);
        }

    };

    return (
        <AuthLayout
            title={t('signIn.title')}
            subtitle={t('signIn.subtitle')}
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
                    label={t('signIn.username')}
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
                    helperText={errors.userName?.message && t(errors.userName.message, { ns: 'errors' })}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    label={t('signIn.password')}
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
                    helperText={errors.password?.message && t(errors.password.message, { ns: 'errors' })}
                />

                <Box textAlign="right" mt={1} mb={3}>
                    <Typography variant="body2" fontWeight={500}>
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                            {t('signIn.forgotPassword')}
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
                    {t('signIn.submit')}
                </Button>

                <Typography variant="body2" align="center">
                    {t('signIn.noAccount')}{' '}
                    <Link to="/signup" style={{ fontWeight: 'bold' }}>
                        {t('signIn.signUp')}
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    );

}
