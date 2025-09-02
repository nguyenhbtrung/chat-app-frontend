import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
    InputAdornment,
} from "@mui/material";
import { CheckCircle, Close, Lock, Visibility, VisibilityOff, VpnKey } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "chat-app-zod-schema";

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {
    const { t } = useTranslation("setting");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const defaultValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset(defaultValues);
        setShowCurrent(false);
        setShowNew(false);
        setShowConfirm(false);
    };


    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") return;
                onClose();
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "20px",
                        padding: 2,
                        minWidth: 360,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textAlign: "center",
                    position: "relative",
                }}
            >
                {t("profile.changePassword.title")}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} pt={1}>
                    <TextField
                        type={showCurrent ? 'text' : 'password'}
                        label={t("profile.changePassword.label.current")}
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKey />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowCurrent((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showCurrent ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                        {...register('currentPassword')}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message && t(errors.currentPassword.message, { ns: 'errors' })}
                    />
                    <TextField
                        type={showNew ? 'text' : 'password'}
                        label={t("profile.changePassword.label.new")}
                        fullWidth
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
                                            onClick={() => setShowNew((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showNew ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                        {...register('newPassword')}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message && t(errors.newPassword.message, { ns: 'errors' })}
                    />
                    <TextField
                        type={showConfirm ? 'text' : 'password'}
                        label={t("profile.changePassword.label.confirm")}
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CheckCircle />
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
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    {t("profile.changePassword.button.cancel")}
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit(handleFormSubmit)}>
                    {t("profile.changePassword.button.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
