import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import
{
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Typography,
    Chip,
    IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";
import ShareDocumentModal from "./ShareDocumentModal";

// Design ke hisaab se Colors
const permissionStyles = {
    Editor: { color: "#09c015e6", bg: "#86878633" },
    "View Only": { color: "#605d5de6", bg: "#605d5de6" },
    Administrator: { color: "#fa2626e6", bg: "#de171733" },
};
const rows = [
    {
        name: "2026-19-8_do-not.zip",
        size: "44 GB",
        lastModified: "2026/4/12",
        permission: "Editor",
    },
    {
        name: "LandingPage.html",
        size: "10 MB",
        lastModified: "2026/4/12",
        permission: "Administrator",
    },
];

const FileTable = () =>
{
    const [ anchorEl, setAnchorEl ] = useState( null );
    const open = Boolean( anchorEl );

    const handleClick = ( event ) =>
    {
        setAnchorEl( event.currentTarget );
    };

    const handleClose = () =>
    {
        setAnchorEl( null );
    };

    const [ openShareDocModal, setOpenShareDocModal ] = React.useState( false );

    const handleOpenShareDocModal = () =>
    {
        setOpenShareDocModal( true );
        handleClose();
    };
    const handleCloseShareDocModal = () =>
    {
        setOpenShareDocModal( false );
    };

    return (
        <>
            <TableContainer
                component={ Paper }
                elevation={ 0 }
                sx={ { border: "1px solid #eee" } }
            >
                <Table sx={ { minWidth: 650 } }>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={ { fontWeight: "bold", color: "#333" } }>
                                File Name
                            </TableCell>
                            <TableCell sx={ { fontWeight: "bold", color: "#333" } }>
                                Last Modified
                            </TableCell>
                            <TableCell sx={ { fontWeight: "bold", color: "#333" } }>
                                File Permission
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { rows.map( ( row, index ) => (
                            <TableRow key={ index } hover>
                                {/* File Icon and Name */ }
                                <TableCell>
                                    <Box sx={ { display: "flex", alignItems: "center", gap: 2 } }>
                                        <Avatar sx={ { bgcolor: "#f0f0f0", color: "#555" } }>
                                            { row.name.endsWith( ".jpg" ) ? (
                                                <ImageIcon />
                                            ) : row.name.endsWith( ".html" ) ? (
                                                <CodeIcon />
                                            ) : (
                                                <InsertDriveFileIcon />
                                            ) }
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" sx={ { fontWeight: 600 } }>
                                                { row.name }
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                { row.size }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                {/* Date */ }
                                <TableCell>{ row.lastModified }</TableCell>

                                {/* Permission Chip */ }
                                <TableCell>
                                    <Chip
                                        label={ row.permission }
                                        size="small"
                                        sx={ {
                                            fontWeight: 600,
                                            color: permissionStyles[ row.permission ]?.color,
                                            backgroundColor: permissionStyles[ row.permission ]?.bg,
                                            borderRadius: "12px",
                                        } }
                                    />
                                </TableCell>

                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={ handleClick }
                                        aria-controls={ open ? "basic-menu" : undefined }
                                        aria-haspopup="true"
                                        aria-expanded={ open ? "true" : undefined }
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        id="basic-menu"
                                        anchorEl={ anchorEl }
                                        open={ open }
                                        onClose={ handleClose }
                                        MenuListProps={ {
                                            "aria-labelledby": "basic-button",
                                        } }
                                        PaperProps={ {
                                            style: {
                                                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                                                minWidth: "120px",
                                            },
                                        } }
                                    >
                                        <MenuItem onClick={ handleOpenShareDocModal }>Share</MenuItem>
                                        <MenuItem onClick={ handleClose }>View Details</MenuItem>
                                        <MenuItem onClick={ handleClose }>Edit User</MenuItem>
                                        <MenuItem
                                            onClick={ handleClose }
                                            sx={ { color: "error.main" } }
                                        >
                                            Delete
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>

            <ShareDocumentModal
                open={ openShareDocModal }
                handleClose={ handleCloseShareDocModal }
            />
        </>
    );
};

export default FileTable;
