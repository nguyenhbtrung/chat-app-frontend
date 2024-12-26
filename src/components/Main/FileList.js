import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const FileList = ({ files }) => {
    return (
        <List sx={{ overflowY: 'auto', maxHeight: 365 }}>
            {files.map((file, index) => (
                <a
                    key={index}
                    href={file.url}
                    download={file.name}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <ListItem divider button>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={file.name}
                            secondary={
                                <Typography variant="caption">
                                    Send by: {file.sender}
                                </Typography>
                            }
                        />
                    </ListItem>
                </a>
            ))}
        </List>
    );
};

export default FileList;