import React, { useRef, useState, useEffect } from "react";

import searchIcon from "../assets/search.png";
import chronometerIcon from "../assets/chronometer.png";
import plusIcon from "../assets/plus.png";
import bellIcon from "../assets/bell.png";
import userAvatar from "../assets/userAvatar.png";
import logoutIcon from "../assets/logout.png";

import { Avatar, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateNewTaskForm from "../pages/Dashboard/CreateNewTaskForm";
import { useSelector } from "react-redux";



const Navbar = () =>
{
    const [ open, setOpen ] = useState( false );

    const { reminders, loading } = useSelector( state => state.reminder );
    const { notifications } = useSelector( ( state ) => state.notification );

    const toggleDrawer = ( value ) => ( event ) =>
    {
        if (
            event.type === "keydown" &&
            ( event.key === "Tab" || event.key === "Shift" )
        )
        {
            return;
        }
        setOpen( value );
    };

    const navigate = useNavigate();

    const [ showNotifications, setShowNotifications ] = useState( false );
    const notificationRef = useRef( null );

    const [ showReminders, setShowReminders ] = useState( false );
    const remindersRef = useRef( null );

    const handleShowNotifications = () =>
    {
        setShowNotifications( true );
    };

    const handleShowReminders = () =>
    {
        setShowReminders( true );
    };

    useEffect( () =>
    {
        const handleClickOutside = ( event ) =>
        {
            if (
                notificationRef.current &&
                !notificationRef.current.contains( event.target ) &&
                remindersRef.current &&
                !remindersRef.current.contains( event.target )
            )
            {
                setShowNotifications( false );
                setShowReminders( false );
            }
        };

        document.addEventListener( "mousedown", handleClickOutside );

        return () =>
        {
            document.removeEventListener( "mousedown", handleClickOutside );
        };
    }, [] );

    const { isAuthenticated } = useSelector( ( state ) => state.auth );
    const { user } = useSelector( ( state ) => state.user );

    return (
        <>
            <div className="px-10 shadow py-4 flex relative w-full justify-between bg-white">
                <div className="flex gap-2 items-center">
                    <div className="bg-[#EFEFEF] h-8 w-8 rounded-lg flex justify-center items-center">
                        <img className="w-3" src={ searchIcon } alt="" />
                    </div>
                    <input
                        className="placeholder:text-[#000000] border-0 mt-1 outline-0 text-[13px] placeholder:text-[13px] opacity-80"
                        type="text"
                        placeholder="Search here..."
                    />
                </div>

                <div className="flex justify-between pl-10">
                    <div className="flex items-center gap-7">
                        <div className="flex gap-2">
                            <div className="relative">
                                <Tooltip title="Reminder">
                                    <div
                                        onClick={ handleShowReminders }
                                        className="w-9 h-9 relative cursor-pointer bg-[#EFEFEF]  rounded-lg flex justify-center items-center"
                                    >
                                        <img className="w-4.5" src={ chronometerIcon } alt="" />
                                        { reminders?.length != 0 && <span className="bg-[#FA2626] absolute -top-0.5 -right-1 opacity-80 flex justify-center items-center text-[9px] text-white h-3.5 w-3.5 rounded-full">
                                            { reminders?.length }
                                        </span> }
                                    </div>
                                </Tooltip>
                                <div
                                    ref={ remindersRef }
                                    className={ `dropdown ${ showReminders && "show"
                                        }  bg-[#EFEFEF] z-999 max-w-73.5 h-77.5 w-65 absolute` }
                                >
                                    <div className="border-b border-b-[#ccc] px-3 py-1.25">
                                        <p className="text-black text-[14px] font-semibold">
                                            Task Reminders
                                        </p>
                                    </div>

                                    <>
                                        { reminders.slice( 0, 4 ).map( ( elem, index ) => (
                                            <div
                                                key={ index }
                                                style={ { borderColor: "rgba(248, 248, 248, 0.1)" } }
                                                className={ `flex relative p-2.5  border-b border-b-[#e1e8ed]  gap-3 items-start ${ index % 2 != 0 && "bg-[#dadada]"
                                                    }` }
                                            >
                                                <div>
                                                    <p className="text-black font-semibold capitalize text-[14px]">
                                                        { elem.title }
                                                    </p>
                                                    <p className="text-[#333333] text-[12px] -mt-1 font-medium">
                                                        { elem.message }
                                                    </p>
                                                    <p className="text-[#666666] text-[13px] mt-1 font-medium">
                                                        { elem.dueDate }
                                                    </p>
                                                </div>

                                                <div>
                                                    <p
                                                        className={ `text-white inline-block text-[11px] px-1.5 absolute top-0 right-0 ${ elem.priority == "OVERDUE"
                                                            ? "bg-[rgba(250,38,38,.8)]"
                                                            : elem.priority == "TODAY"
                                                                ? "bg-[#18A322]"
                                                                : "bg-[#157FD7]"
                                                            }` }
                                                    >
                                                        { elem.priority }
                                                    </p>
                                                </div>
                                            </div>
                                        ) ) }

                                        {/* <div style={ { borderBottomColor: "#474747" } }>
                                            <Button
                                                sx={ {
                                                    width: "100%",
                                                    color: "black",
                                                    fontSize: "12px",
                                                    textAlign: "center",
                                                    backgroundColor: "#dadada",
                                                    textTransform: "capitalize",
                                                    borderRadius: "0px",
                                                } }
                                            >
                                                <span className="font-medium"> View More</span>
                                            </Button>
                                        </div> */}
                                    </>
                                </div>
                            </div>

                            <div className="relative">
                                <Tooltip title="Notifications">
                                    <div
                                        onClick={ handleShowNotifications }
                                        className="w-9 cursor-pointer relative h-9 bg-[#EFEFEF]  rounded-lg flex justify-center items-center"
                                    >
                                        <img className="w-4" src={ bellIcon } alt="" />

                                        { notifications.filter( n => n.status === "New" ).length != 0 && <span className="bg-[#FA2626] absolute -top-0.5 -right-1 opacity-80 flex justify-center items-center text-[9px] text-white h-3.5 w-3.5 rounded-full">
                                            { notifications.filter( n => n.status === "New" ).length }
                                        </span> }
                                    </div>
                                </Tooltip>

                                <div
                                    ref={ notificationRef }
                                    className={ `dropdown ${ showNotifications && "show"
                                        }  bg-[#EFEFEF] z-999 max-w-73.5 h-77.5 w-65 absolute` }
                                >
                                    <div className="border-b border-b-[#ccc] px-3 py-1.25">
                                        <p className="text-black text-[14px] font-semibold">
                                            2 new messages
                                        </p>
                                    </div>

                                    <>
                                        { notifications.slice( 0, 4 ).map( ( elem, index ) => (
                                            <div
                                                key={ index }
                                                style={ { borderColor: "rgba(248, 248, 248, 0.1)" } }
                                                className={ `flex relative p-2.5  border-b border-b-[#e1e8ed]  gap-3 items-start ${ index % 2 != 0 && "bg-[#dadada]"
                                                    }` }
                                            >
                                                <div>
                                                    <img
                                                        className="min-w-8 object-cover min-h-8 w-8 h-8 rounded-full"
                                                        src={ elem.profileUrl || userAvatar }
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-black font-semibold capitalize text-[14px]">
                                                        { elem.username }
                                                    </p>
                                                    <p className="text-[#333333] text-[12px] -mt-1 font-medium">
                                                        { elem.message }
                                                    </p>
                                                    <p className="text-[#666666] text-[13px] mt-1 font-medium">
                                                        { elem.time }
                                                    </p>
                                                </div>

                                                <div>
                                                    <p
                                                        className={ `text-white inline-block text-[11px] px-1.5 absolute top-0 right-0 ${ elem.status == "New"
                                                            ? "bg-[#18A322]"
                                                            : elem.status == "Reply"
                                                                ? "bg-[rgba(250,38,38,.8)]"
                                                                : "bg-[#157FD7]"
                                                            }` }
                                                    >
                                                        { elem.status }
                                                    </p>
                                                </div>
                                            </div>
                                        ) ) }

                                        <div className="absolute bottom-0 w-full" style={ { borderBottomColor: "#474747" } }>
                                            <Button
                                                onClick={ () => navigate( "/chat" ) }
                                                sx={ {
                                                    width: "100%",
                                                    color: "black",
                                                    fontSize: "12px",
                                                    textAlign: "center",
                                                    backgroundColor: "#dadada",
                                                    textTransform: "capitalize",
                                                    borderRadius: "0px",
                                                } }
                                            >
                                                <span className="font-medium"> View More</span>
                                            </Button>
                                        </div>
                                    </>
                                </div>
                            </div>

                            <Tooltip title="Create Task">
                                <div
                                    onClick={ ( e ) =>
                                    {
                                        e.stopPropagation();
                                        toggleDrawer( true )( e );
                                    } }
                                    className="w-9 cursor-pointer h-9 bg-[#EFEFEF]  rounded-lg flex justify-center items-center"
                                >
                                    <img className="w-3.5" src={ plusIcon } alt="" />
                                </div>
                            </Tooltip>
                        </div>

                        <div className="h-full w-px  bg-[#efefef]"> </div>

                        { isAuthenticated ? (
                            <Tooltip title="Profile">
                                <div onClick={ () => navigate( "/profile" ) }>


                                    <Avatar
                                        src={ user?.profileImage == null ? userAvatar : user.profileImage }
                                        alt="User Profile"
                                        sx={ {
                                            width: 35,
                                            height: 35,
                                            cursor: "pointer",
                                            objectFit: "cover",
                                        } }
                                    />
                                </div>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Login">
                                <div
                                    onClick={ () => navigate( "/signin" ) }
                                    className="w-9 cursor-pointer h-9 bg-[#EFEFEF]  rounded-lg flex justify-center items-center"
                                >
                                    <img className="w-4" src={ logoutIcon } alt="" />
                                </div>
                            </Tooltip>
                        ) }
                    </div>
                </div>
            </div>

            <CreateNewTaskForm toggleDrawer={ toggleDrawer } open={ open } />
        </>
    );
};

export default Navbar;
