// AvatarCropper.jsx
import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slider,
    Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AvatarCropper = ({
    open,
    image,
    scale,
    onScaleChange,
    onCancel,
    onApply,
}) => {
    const editorRef = useRef(null);

    const { t } = useTranslation();
    const handleApply = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const avatarURL = canvas.toDataURL(); // base64
            onApply(avatarURL);
        }
    };

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{t('dialog.avatarCropper.title')}</DialogTitle>
            <DialogContent>
                {image && (
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <AvatarEditor
                            ref={editorRef}
                            image={image}
                            width={200}
                            height={200}
                            border={30}
                            borderRadius={100}
                            scale={scale}
                        />
                        <Slider
                            min={1}
                            max={3}
                            step={0.1}
                            value={scale}
                            onChange={(e, val) => onScaleChange(val)}
                            sx={{ width: 200 }}
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit">
                    {t('button.cancel')}
                </Button>
                <Button variant="contained" onClick={handleApply}>
                    {t('button.apply')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AvatarCropper;
