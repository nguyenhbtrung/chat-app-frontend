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
import { register as registerUser } from '../services/authService';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { handleApiError } = useApiErrorHandler();
    const { t } = useTranslation('auth');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await registerUser(data);
            console.log(">>>Check register res: ", res?.data);
            toast.success(t('api.success.SIGN_UP', { ns: 'api' }));
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <AuthLayout
            title={t('signUp.title')}
            subtitle={t('signUp.subtitle')}
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
                    label={t('signUp.username')}
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
                    label={t('signUp.email')}
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
                    helperText={errors.email?.message && t(errors.email.message, { ns: 'errors' })}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label={t('signUp.password')}
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
                    helperText={errors.password?.message && t(errors.password.message, { ns: 'errors' })}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label={t('signUp.confirmPassword')}
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
                    helperText={errors.confirmPassword?.message && t(errors.confirmPassword.message, { ns: 'errors' })}
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 2, my: 2 }}
                    type="submit"
                >
                    {t('signUp.submit')}
                </Button>

                <Typography variant="body2" align="center">
                    {t('signUp.haveAccount')}{' '}
                    <Link to="/signin" style={{ fontWeight: 'bold' }}>
                        {t('signUp.signIn')}
                    </Link>
                </Typography>
            </Box>
        </AuthLayout>
    );
}
