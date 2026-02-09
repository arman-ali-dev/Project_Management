import React from "react";
import dragIcon from "../../assets/drag.png";
import messageIcon from "../../assets/mes.png";
import profilePic from "../../assets/profile.jpg";
import profilePic2 from "../../assets/profile2.jpg";
import menuIcon from "../../assets/menu.png";
import userAvatar from "../../assets/userAvatar.png";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import
    {
        updateTaskStatus,
        updateTaskStatusLocal,
    } from "../../redux/member/taskSlice";
import { useDispatch } from "react-redux";
import ViewTaskDetailsModal from "./ViewTaskDetailsModal";

const Task = ( { task } ) =>
{
    const dispatch = useDispatch();
    const [ filterAnchorEl, setFilterAnchorEl ] = React.useState( null );
    const openFilterDropDown = Boolean( filterAnchorEl );
    const handleClick = ( event ) =>
    {
        setFilterAnchorEl( event.currentTarget );
    };
    const handleCloseFilterDropDown = () =>
    {
        setFilterAnchorEl( null );
    };

    const getNextStatus = ( status ) =>
    {
        switch ( status )
        {
            case "TODO":
                return { label: "Move to Doing", value: "IN_PROGRESS" };
            case "IN_PROGRESS":
                return { label: "Move to Done", value: "DONE" };

            default:
                return null;
        }
    };

    const nextStatus = getNextStatus( task.status );

    // View Details

    const [ openDetailsModal, setOpenDetailsModal ] = React.useState( false );
    const handleOpenDetailsModal = () => setOpenDetailsModal( true );
    const handleCloseDetailsModal = () => setOpenDetailsModal( false );

    return (
        <>
            <div className="bg-[#EFEFEF] w-full px-5 flex justify-between items-center py-2 rounded-xl">
                <div className="flex gap-7 items-center ">
                    <img className="w-5 cursor-grab" src={ dragIcon } alt="" />

                    <p className="text-[13px] font-medium">{ task.title }</p>
                </div>

                <p className="text-[13px]">
                    { task.description.split( " " ).slice( 0, 7 ).join( " " ) }
                    { task.description.split( " " ).length > 5 ? "..." : "" }
                </p>

                <p className="text-[11px] flex items-start gap-1.5 font-medium">
                    <img src={ messageIcon } alt="Message Icon" className="w-3.5" /> 3
                    Conversations
                </p>

                <div className="flex">
                    { task.assignedTo?.slice( 0, 2 ).map( ( u ) => (
                        <img
                            key={ u.id }
                            className="w-6.5 min-w-6.5 min-h-6.5 h-6.5 -mr-3.5 z-50 relative border-white border rounded-full object-cover"
                            src={ u.profileImage || userAvatar }
                            alt=""
                        />
                    ) ) }
                </div>

                <div
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
                </div>

                <div>
                    <IconButton onClick={ handleClick }>
                        <img src={ menuIcon } alt="menu icon" className="w-4.5 h-4.5 " />
                    </IconButton>

                    <Menu
                        anchorEl={ filterAnchorEl }
                        open={ openFilterDropDown }
                        onClose={ handleCloseFilterDropDown }
                        PaperProps={ {
                            sx: { width: 180, borderRadius: "8px" },
                        } }
                    >
                        <MenuItem
                            onClick={ () =>
                            {
                                handleOpenDetailsModal();
                                handleCloseFilterDropDown();
                            } }
                            sx={ { fontSize: "13px", fontWeight: 700 } }
                        >
                            View Details
                        </MenuItem>

                        { task.status != "DONE" && <Divider /> }

                        { nextStatus && (
                            <MenuItem
                                sx={ { fontSize: "13px", fontWeight: 700 } }
                                onClick={ () =>
                                {
                                    dispatch(
                                        updateTaskStatusLocal( {
                                            taskId: task.id,
                                            status: nextStatus.value,
                                        } ),
                                    );

                                    dispatch(
                                        updateTaskStatus( {
                                            taskId: task.id,
                                            status: nextStatus.value,
                                        } ),
                                    );
                                } }
                            >
                                { nextStatus.label }
                            </MenuItem>
                        ) }
                    </Menu>
                </div>
            </div>

            <ViewTaskDetailsModal
                task={ task }
                open={ openDetailsModal }
                handleClose={ handleCloseDetailsModal }
            />
        </>
    );
};

export default Task;
