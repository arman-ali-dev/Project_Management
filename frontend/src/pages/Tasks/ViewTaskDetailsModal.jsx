import { Box, Modal, Typography, Chip, Avatar, Divider, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";

const ViewTaskDetailsModal = ( { task, open, handleClose } ) =>
{
    // Hard-coded task data

    const handleDownload = async ( doc ) =>
    {
        try
        {
            console.log( doc.fileUrl );

            const response = await fetch( doc.fileUrl ); // cloudinary secure_url
            const blob = await response.blob();

            const url = window.URL.createObjectURL( blob );
            const a = document.createElement( "a" );
            a.href = url;
            a.download = doc.fileName; // exact file name
            document.body.appendChild( a );
            a.click();

            a.remove();
            window.URL.revokeObjectURL( url );
        } catch ( error )
        {
            console.error( "Download failed", error );
        }
    };

    const getFileIcon = ( fileType ) =>
    {
        const type = fileType?.toUpperCase();
        if ( type === 'PDF' ) return <PictureAsPdfIcon sx={ { fontSize: 18, color: '#DC2626' } } />;
        if ( [ 'PNG', 'JPG', 'JPEG', 'GIF', 'WEBP' ].includes( type ) ) return <ImageIcon sx={ { fontSize: 18, color: '#059669' } } />;
        if ( [ 'DOCX', 'DOC', 'TXT' ].includes( type ) ) return <DescriptionIcon sx={ { fontSize: 18, color: '#2563EB' } } />;
        return <InsertDriveFileIcon sx={ { fontSize: 18, color: '#6B7280' } } />;
    };

    const getPriorityColor = ( priority ) =>
    {
        switch ( priority )
        {
            case "HIGH": return "#DC2626";
            case "MEDIUM": return "#F59E0B";
            case "LOW": return "#10B981";
            default: return "#6B7280";
        }
    };

    const getStatusColor = ( status ) =>
    {
        switch ( status )
        {
            case "TODO": return "#6366F1";
            case "IN_PROGRESS": return "#8B5CF6";
            case "COMPLETED": return "#10B981";
            default: return "#6B7280";
        }
    };

    return (
        <div>
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="task-modal-title"
            >
                <Box sx={ {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 680,
                    maxHeight: '90vh',
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                } }>
                    {/* Header */ }
                    <Box sx={ {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        p: 3,
                        borderBottom: '1px solid #E5E7EB',
                    } }>
                        <Box sx={ { flex: 1 } }>
                            <Typography
                                id="task-modal-title"
                                variant="h5"
                                sx={ {
                                    fontWeight: 600,
                                    color: '#111827',
                                    mb: 1.5,
                                } }
                            >
                                { task.title }
                            </Typography>
                            <Box sx={ { display: 'flex', gap: 1, flexWrap: 'wrap' } }>
                                <span
                                    className={ `px-3 py-1 text-[12px] font-semibold rounded ${ task.priority === "HIGH"
                                        ? "bg-[rgba(129,39,255,.2)] text-[#8127FF]"
                                        : task.priority === "LOW"
                                            ? "bg-[rgba(245,86,0,.2)] text-[#F55600]"
                                            : "bg-[rgba(21,127,215,.2)] text-[#157FD7]"
                                        }` }
                                >
                                    { task.status }
                                </span>

                                <span
                                    style={ {
                                        color:
                                            task.category === "DESIGN"
                                                ? "#497AF5"
                                                : task.category === "DEVELOPMENT"
                                                    ? "rgba(250,38,38,.7)"
                                                    : "#09C015",
                                        backgroundColor:
                                            task.category === "DESIGN"
                                                ? "rgba(73,122,245,0.2)"
                                                : task.category === "DEVELOPMENT"
                                                    ? "rgba(222,23,23,.2)"
                                                    : "rgba(1,255,18,.3)",
                                    } }
                                    className=" px-3 py-1.5 rounded-md bg text-[11px] font-medium inline-block"
                                >
                                    { task.category }
                                </span>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={ handleClose }
                            size="small"
                            sx={ {
                                color: '#6B7280',
                                '&:hover': { backgroundColor: '#F3F4F6' },
                            } }
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */ }
                    <Box sx={ {
                        overflowY: 'auto',
                        p: 3,
                        flex: 1,
                    } }>
                        {/* Description */ }
                        <Box sx={ { mb: 3 } }>
                            <Typography
                                variant="subtitle2"
                                sx={ {
                                    fontWeight: 600,
                                    color: '#374151',
                                    mb: 1,
                                    fontSize: '13px',
                                } }
                            >
                                DESCRIPTION
                            </Typography>
                            <Typography
                                sx={ {
                                    color: '#4B5563',
                                    fontSize: '14px',
                                    lineHeight: 1.7,
                                } }
                            >
                                { task.description }
                            </Typography>
                        </Box>

                        <Divider sx={ { my: 3 } } />

                        {/* Details Grid */ }
                        <Box sx={ {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 2.5,
                            mb: 3,
                        } }>
                            {/* Priority */ }
                            <Box>
                                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 } }>
                                    <PriorityHighIcon sx={ { fontSize: 16, color: '#6B7280' } } />
                                    <Typography
                                        variant="caption"
                                        sx={ {
                                            fontWeight: 600,
                                            color: '#6B7280',
                                            textTransform: 'uppercase',
                                            fontSize: '11px',
                                        } }
                                    >
                                        Priority
                                    </Typography>
                                </Box>
                                <span
                                    className={ `px-3 py-1 text-[12px] font-semibold rounded ${ task.priority === "HIGH"
                                        ? "bg-[rgba(129,39,255,.2)] text-[#8127FF]"
                                        : task.priority === "LOW"
                                            ? "bg-[rgba(245,86,0,.2)] text-[#F55600]"
                                            : "bg-[rgba(21,127,215,.2)] text-[#157FD7]"
                                        }` }
                                >
                                    { task.priority }
                                </span>
                            </Box>

                            {/* Due Date */ }
                            <Box>
                                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 } }>
                                    <CalendarTodayIcon sx={ { fontSize: 16, color: '#6B7280' } } />
                                    <Typography
                                        variant="caption"
                                        sx={ {
                                            fontWeight: 600,
                                            color: '#6B7280',
                                            textTransform: 'uppercase',
                                            fontSize: '11px',
                                        } }
                                    >
                                        Due Date
                                    </Typography>
                                </Box>
                                <Typography sx={ { color: '#111827', fontSize: '14px', fontWeight: 500, mt: 0.5 } }>
                                    { new Date( task.dueDate ).toLocaleDateString( 'en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    } ) }
                                </Typography>
                            </Box>

                            {/* Estimated Time */ }
                            <Box>
                                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 } }>
                                    <AccessTimeIcon sx={ { fontSize: 16, color: '#6B7280' } } />
                                    <Typography
                                        variant="caption"
                                        sx={ {
                                            fontWeight: 600,
                                            color: '#6B7280',
                                            textTransform: 'uppercase',
                                            fontSize: '11px',
                                        } }
                                    >
                                        Estimated Time
                                    </Typography>
                                </Box>
                                <Typography sx={ { color: '#111827', fontSize: '14px', fontWeight: 500, mt: 0.5 } }>
                                    { task.estimatedTime } hours
                                </Typography>
                            </Box>

                            {/* Project */ }
                            <Box>
                                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 } }>
                                    <FolderIcon sx={ { fontSize: 16, color: '#6B7280' } } />
                                    <Typography
                                        variant="caption"
                                        sx={ {
                                            fontWeight: 600,
                                            color: '#6B7280',
                                            textTransform: 'uppercase',
                                            fontSize: '11px',
                                        } }
                                    >
                                        Project
                                    </Typography>
                                </Box>
                                <Typography sx={ { color: '#111827', fontSize: '14px', fontWeight: 500, mt: 0.5 } }>
                                    { task.project.name }
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={ { my: 3 } } />

                        {/* Assigned To */ }
                        <Box sx={ { mb: 3 } }>
                            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 } }>
                                <PersonIcon sx={ { fontSize: 16, color: '#6B7280' } } />
                                <Typography
                                    variant="caption"
                                    sx={ {
                                        fontWeight: 600,
                                        color: '#6B7280',
                                        textTransform: 'uppercase',
                                        fontSize: '11px',
                                    } }
                                >
                                    Assigned To
                                </Typography>
                            </Box>
                            <Box sx={ { display: 'flex', gap: 2, flexWrap: 'wrap' } }>
                                { task.assignedTo.map( ( user ) => (
                                    <Box
                                        key={ user.id }
                                        sx={ {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            backgroundColor: '#F9FAFB',
                                            px: 1.5,
                                            py: 1,
                                            borderRadius: '8px',
                                            border: '1px solid #E5E7EB',
                                        } }
                                    >
                                        <Avatar
                                            src={ user.profileImage }
                                            sx={ {
                                                width: 28,
                                                height: 28,
                                                fontSize: '12px',
                                                backgroundColor: '#6366F1',
                                            } }
                                        >
                                            { user.fullName.charAt( 0 ) }
                                        </Avatar>
                                        <Typography sx={ { fontSize: '13px', fontWeight: 500, color: '#111827' } }>
                                            { user.fullName }
                                        </Typography>
                                    </Box>
                                ) ) }
                            </Box>
                        </Box>

                        {/* Labels */ }
                        { task.labels && task.labels.length > 0 && (
                            <Box sx={ { mb: 3 } }>
                                <Typography
                                    variant="caption"
                                    sx={ {
                                        fontWeight: 600,
                                        color: '#6B7280',
                                        textTransform: 'uppercase',
                                        fontSize: '11px',
                                        display: 'block',
                                        mb: 1.5,
                                    } }
                                >
                                    Labels
                                </Typography>
                                <Box sx={ { display: 'flex', gap: 1, flexWrap: 'wrap' } }>
                                    { task.labels.map( ( label, index ) => (
                                        <Chip
                                            key={ index }
                                            label={ label }
                                            size="small"
                                            sx={ {
                                                backgroundColor: '#EEF2FF',
                                                color: '#4F46E5',
                                                fontWeight: 500,
                                                fontSize: '12px',
                                            } }
                                        />
                                    ) ) }
                                </Box>
                            </Box>
                        ) }

                        {/* Support Documents */ }
                        { task.supportDocuments && task.supportDocuments.length > 0 && (
                            <Box>
                                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 } }>
                                    <AttachFileIcon sx={ { fontSize: 16, color: '#6B7280' } } />
                                    <Typography
                                        variant="caption"
                                        sx={ {
                                            fontWeight: 600,
                                            color: '#6B7280',
                                            textTransform: 'uppercase',
                                            fontSize: '11px',
                                        } }
                                    >
                                        Attachments
                                    </Typography>
                                </Box>
                                <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
                                    { task.supportDocuments.map( ( doc, index ) => (
                                        <Box
                                            key={ index }
                                            sx={ {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                backgroundColor: '#F9FAFB',
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: '8px',
                                                border: '1px solid #E5E7EB',
                                            } }
                                        >
                                            { getFileIcon( doc.fileType ) }
                                            <Typography sx={ { fontSize: '13px', color: '#374151', flex: 1 } }>
                                                { doc.fileName }
                                            </Typography>
                                            <Chip
                                                label={ doc.fileType }
                                                size="small"
                                                sx={ {
                                                    height: '20px',
                                                    fontSize: '10px',
                                                    fontWeight: 600,
                                                    backgroundColor: '#EEF2FF',
                                                    color: '#4F46E5',
                                                } }
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={ () => handleDownload( doc ) }
                                                sx={ {
                                                    color: '#6B7280',
                                                    backgroundColor: '#FFF',
                                                    border: '1px solid #E5E7EB',
                                                    '&:hover': {
                                                        backgroundColor: '#F3F4F6',
                                                        color: '#111827',
                                                    },
                                                } }
                                            >
                                                <DownloadIcon sx={ { fontSize: 18 } } />
                                            </IconButton>
                                        </Box>
                                    ) ) }
                                </Box>
                            </Box>
                        ) }
                    </Box>

                    {/* Footer */ }
                    <Box sx={ {
                        borderTop: '1px solid #E5E7EB',
                        px: 3,
                        py: 2,
                        backgroundColor: '#F9FAFB',
                    } }>
                        <Typography sx={ { fontSize: '12px', color: '#6B7280' } }>
                            {/* Created by <strong>{ task.createdBy.fullName }</strong> on{ ' ' } */ }
                            { new Date( task.createdAt ).toLocaleDateString( 'en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            } ) }
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ViewTaskDetailsModal;