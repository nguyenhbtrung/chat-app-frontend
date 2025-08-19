import React, { useState } from "react";
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
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AvatarCropper from "./AvatarCropper";
import { useTranslation } from "react-i18next";

const SetupDialog = ({ open, onClose }) => {
    const [avatar, setAvatar] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const [scale, setScale] = useState(1.2);
    const [isCropping, setIsCropping] = useState(false);

    const [displayName, setDisplayName] = useState("");

    const { t } = useTranslation('setup');

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

    const handleSave = () => {
        alert(`Saved!\nDisplay Name: ${displayName}`);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                onClose();
            }}
            slotProps={{
                paper: {
                    sx: { borderRadius: "20px", padding: 2, minWidth: 350 },
                }
            }}
        >
            <DialogTitle sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                {t('setup.title.line1')}
                <br />
                {t('setup.title.line2')}
            </DialogTitle>

            <DialogContent>
                {/* Avatar field */}
                <Divider sx={{ backgroundColor: '#e0e0e0' }} />
                <Box display="flex" alignItems="center" justifyContent="space-between" py={1}>
                    <Typography variant="body2">{t('setup.label.avatar')}</Typography>
                    <Box position="relative">
                        <Avatar
                            src={avatar}
                            sx={{ width: 60, height: 60, border: "1px solid #ccc" }}
                        />
                        <IconButton
                            component="label"
                            size="small"
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: "background.paper",
                                borderWidth: "1px",
                                borderStyle: "solid"
                                // border: "1px solid #000",
                            }}
                        >
                            <PhotoCamera fontSize="small" />
                            <input hidden accept="image/*" type="file" onChange={handleUpload} />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ backgroundColor: '#e0e0e0' }} />

                {/* Display name field */}
                <Box display="flex" alignItems="center" justifyContent="space-between" py={1}>
                    <Typography variant="body2">{t('setup.label.displayName')}</Typography>
                    <TextField
                        variant="standard"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={t('setup.placeholder.displayName')}
                        slotProps={{
                            input: {
                                disableUnderline: true,
                            },
                            htmlInput: {
                                style: { textAlign: "right" },
                            }
                        }}
                        sx={{
                            maxWidth: "60%",
                            "& .MuiInputBase-input::placeholder": {
                                textAlign: "right",
                            },
                        }}
                    />
                </Box>
                <Divider sx={{ backgroundColor: '#e0e0e0' }} />
            </DialogContent>

            <DialogActions sx={{ justifyContent: "flex-end", px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">
                    {t('setup.button.skip')}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!displayName.trim()}
                >
                    {t('setup.button.save')}
                </Button>
            </DialogActions>

            <AvatarCropper
                open={isCropping}
                image={tempImage}
                scale={scale}
                onScaleChange={setScale}
                onCancel={() => setIsCropping(false)}
                onApply={handleApplyCrop}
            />
        </Dialog>
    );
};

export default SetupDialog;
