import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    IconButton,
    Typography,
    Box,
    Divider,
    TextField,
    MenuItem,
    Select,
    Tabs,
    Tab,
} from "@mui/material";
import { Close, PhotoCamera } from "@mui/icons-material";
import AvatarCropper from "./AvatarCropper";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/ThemeContext";
import { LANGUAGES, THEMES } from "../../../constants";
import ChangePasswordDialog from "./ChangePasswordDialog";

const ProfileSettingsDialog = ({ open, onClose, isMobile }) => {
    const { t, i18n } = useTranslation('setting');
    const { mode, saveMode } = useContext(ThemeContext);
    const [tab, setTab] = useState(0);

    const [avatar, setAvatar] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [scale, setScale] = useState(1.2);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const [profile, setProfile] = useState({
        userName: "user01",
        displayName: "User 01",
        email: "user01@gmail.com",
        password: "********",
    });

    const [settings, setSettings] = useState({
        theme: mode,
        language: localStorage.getItem('i18nextLng'),
    });

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTempImage(file);
            setIsCropping(true);
            event.target.value = "";
        }
    };

    const handleApplyCrop = (avatarURL) => {
        setAvatar(avatarURL);
        setIsCropping(false);
    };

    const handleProfileChange = (field) => (e) => {
        setProfile({ ...profile, [field]: e.target.value });
    };

    const handleSettingsChange = (field) => (e) => {
        const value = e.target.value;
        setSettings({ ...settings, [field]: value });
        if (field === 'theme') {
            saveMode(value);
        } else {
            i18n.changeLanguage(value);
        }
    };

    const handleSave = () => {
        alert(
            "Saved!\n\nProfile:\n" +
            JSON.stringify(profile, null, 2) +
            "\n\nSettings:\n" +
            JSON.stringify(settings, null, 2)
        );
    };

    const handleChangePasswordSubmit = (data) => {
        alert("Password changed:\n" + JSON.stringify(data, null, 2));
        setOpenChangePassword(false);
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
                        minWidth: isMobile ? 350 : 450,
                        minHeight: 530
                    },
                }
            }}
        >
            <DialogTitle sx={{ fontSize: "1.1rem", fontWeight: 600, textAlign: "center", position: "relative" }}>
                {t('title')}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                centered
                sx={{
                    "& .MuiTab-root": { textTransform: "none", fontSize: "0.9rem", minWidth: "50%" }
                }}
            >
                <Tab label={t('profile.title')} />
                <Tab label={t('settings.title')} />
            </Tabs>

            <DialogContent>
                {tab === 0 && (
                    <>
                        {/* Avatar */}
                        <Divider />
                        <Box display="flex" alignItems="center" gap={2} py={2}>
                            <Box position="relative">
                                <Avatar
                                    src={avatar}
                                    sx={{ width: 64, height: 64, border: "1px solid #ccc" }}
                                />
                                <IconButton
                                    component="label"
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: "background.paper",
                                        border: "1px solid #ccc"
                                    }}
                                >
                                    <PhotoCamera fontSize="small" />
                                    <input hidden accept="image/*" type="file" onChange={handleUpload} />
                                </IconButton>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">{profile.displayName || profile.userName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {profile.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />

                        {/* Username */}
                        <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ flex: 1 }}>{t('profile.label.userName')}</Typography>
                            <TextField
                                variant="standard"
                                value={profile.userName}
                                disabled
                                slotProps={{
                                    input: { disableUnderline: true },
                                    htmlInput: { style: { textAlign: "right" } }
                                }}
                                sx={{
                                    maxWidth: "60%",
                                    "& .MuiInputBase-input": {
                                        fontSize: "0.875rem",
                                    },
                                }}
                            />
                        </Box>
                        <Divider />

                        {/* Display Name */}
                        <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ flex: 1 }}>{t('profile.label.displayName')}</Typography>
                            <TextField
                                variant="standard"
                                value={profile.displayName}
                                placeholder={t('profile.placeholder.displayName')}
                                onChange={handleProfileChange("displayName")}
                                slotProps={{
                                    input: { disableUnderline: true },
                                    htmlInput: { style: { textAlign: "right" } }
                                }}
                                sx={{
                                    maxWidth: "60%",
                                    "& .MuiInputBase-input": {
                                        fontSize: "0.875rem",
                                    },
                                }}
                            />
                        </Box>
                        <Divider />

                        {/* Email */}
                        <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ flex: 1 }}>{t('profile.label.email')}</Typography>
                            <TextField
                                variant="standard"
                                value={profile.email}
                                disabled
                                slotProps={{
                                    input: { disableUnderline: true },
                                    htmlInput: { style: { textAlign: "right" } }
                                }}
                                sx={{
                                    maxWidth: "60%",
                                    "& .MuiInputBase-input": {
                                        fontSize: "0.875rem",
                                    },
                                }}
                            />
                        </Box>
                        <Divider />

                        {/* Password */}
                        <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ flex: 1 }}>{t('profile.label.password')}</Typography>
                            <TextField
                                variant="standard"
                                value={profile.password}
                                type="password"
                                disabled
                                slotProps={{
                                    input: { disableUnderline: true },
                                    htmlInput: { style: { textAlign: "right" } }
                                }}
                                sx={{
                                    maxWidth: "60%",
                                    "& .MuiInputBase-input": {
                                        fontSize: "0.875rem",
                                    },
                                }}
                            />
                        </Box>
                        <Divider />
                    </>
                )}

                {tab === 1 && (
                    <>
                        <Divider />
                        <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ flex: 1 }}>{t('settings.theme.label')}</Typography>
                            <Select
                                size="small"
                                value={settings.theme}
                                onChange={handleSettingsChange("theme")}
                                variant="outlined"
                                sx={{
                                    fontSize: "0.875rem",
                                    color: "text.secondary",
                                    minWidth: 100,
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                }}
                            >
                                {Object.values(THEMES).map((theme) => (
                                    <MenuItem value={theme}>{t(`settings.theme.option.${theme}`)}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Divider />

                        <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ flex: 1 }}>{t('settings.language.label')}</Typography>
                            <Select
                                size="small"
                                value={settings.language}
                                onChange={handleSettingsChange("language")}
                                variant="outlined"
                                sx={{
                                    fontSize: "0.875rem",
                                    color: "text.secondary",
                                    minWidth: 100,
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                }}
                            >
                                {Object.values(LANGUAGES).map((language) => (
                                    <MenuItem value={language}>{t(`settings.language.option.${language}`)}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Divider />
                    </>
                )}
            </DialogContent>

            {tab === 0 && (
                <DialogActions sx={{ justifyContent: "flex-end", px: 3, pb: 2 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setOpenChangePassword(true)}
                    >
                        {t('profile.button.changePassword')}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        {t('profile.button.saveChanges')}
                    </Button>
                </DialogActions>
            )}

            {/* Avatar Cropper */}
            <AvatarCropper
                open={isCropping}
                image={tempImage}
                scale={scale}
                onScaleChange={setScale}
                onCancel={() => setIsCropping(false)}
                onApply={handleApplyCrop}
            />

            <ChangePasswordDialog
                open={openChangePassword}
                onClose={() => setOpenChangePassword(false)}
                onSubmit={handleChangePasswordSubmit}
            />
        </Dialog>
    );
};

export default ProfileSettingsDialog;
