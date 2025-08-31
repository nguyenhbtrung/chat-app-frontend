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

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {
    const { t } = useTranslation("setting");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSave = () => {
        // validate
        if (!form.currentPassword || !form.newPassword) {
            alert(t("profile.changePassword.error.required"));
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            alert(t("profile.changePassword.error.mismatch"));
            return;
        }

        onSubmit(form);
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
                        value={form.currentPassword}
                        onChange={handleChange("currentPassword")}
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
                    />
                    <TextField
                        type={showNew ? 'text' : 'password'}
                        label={t("profile.changePassword.label.new")}
                        value={form.newPassword}
                        onChange={handleChange("newPassword")}
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
                    />
                    <TextField
                        type={showConfirm ? 'text' : 'password'}
                        label={t("profile.changePassword.label.confirm")}
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
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
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    {t("profile.changePassword.button.cancel")}
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    {t("profile.changePassword.button.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordDialog;
