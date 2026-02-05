import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import layoutIcon from "../assets/layout.png";
import chartIcon from "../assets/chart.png";
import monitorIcon from "../assets/monitor.png";
import checklistIcon from "../assets/checklist.png";
import calenderIcon from "../assets/calendar.png";
import chatIcon from "../assets/chat.png";
import driveIcon from "../assets/drive.png";
import usersIcon from "../assets/users.png";
import logoutIcon from "../assets/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/member/authSlice";

const manu = [
    {
        label: "Dashboard",
        icon: chartIcon,
        path: "/dashboard",
    },
    {
        label: "Projects",
        icon: monitorIcon,
        path: "/projects",
    },
    {
        label: "My Tasks",
        icon: checklistIcon,
        path: "/my-tasks",
    },
    {
        label: "Calender",
        icon: calenderIcon,
        path: "/calendar",
    },
    {
        label: "Chat",
        icon: chatIcon,
        path: "/chat",
    },
    {
        label: "Drive",
        icon: driveIcon,
        path: "/drive",
    },
    {
        label: "Users",
        icon: usersIcon,
        path: "/users",
    },
];

const Sidebar = () =>
{
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector( state => state.user )


    const handleLogout = () =>
    {
        dispatch( logout() );
        navigate( "/signin" )
    }


    return (
        <>
            <div className="shadow bg-white fixed left-0 top-0 h-screen w-76.25 z-50">

                <div className="flex items-center gap-12 border-[#efefef] border-r pl-10 pr-14 border-b shadow pt-4 pb-4">
                    <Link className="text-[21px] font-bold">Dashboard</Link>

                    <div className="bg-black h-9 w-9 rounded-xl flex justify-center items-center">
                        <img className="w-4" src={ layoutIcon } alt="" />
                    </div>
                </div>

                <ul className="px-6 mt-10 space-y-1">
                    { manu.filter( ( item ) =>
                    {
                        if ( item.path === "/users" && user?.role !== "ADMIN" )
                        {
                            return false;
                        }
                        return true;
                    } ).map( ( item, idx ) => (
                        <li

                            key={ idx }
                            className={ `pl-5 py-3 relative ${ location.pathname.startsWith( item.path )
                                ? "rounded-lg bg-[#EFEFEF]"
                                : ""
                                }` }
                        >
                            <Link
                                to={ item.path }
                                key={ idx }
                                className="flex items-center gap-3"
                            >
                                <img className="w-5" src={ item.icon } alt="" />
                                <span className=" text-[15px] mt-0.5">{ item.label }</span>
                            </Link>

                            { item.path == "/my-tasks" && (
                                <span className="bg-[#FA2626] absolute right-3 top-1/2 -translate-y-1/2 opacity-80 flex justify-center items-center text-[12px] text-white h-7 w-7 rounded-lg">
                                    32
                                </span>
                            ) }

                            { item.path == "/chat" && (
                                <span className="bg-[#FA2626] absolute right-3 top-1/2 -translate-y-1/2 opacity-80 flex justify-center items-center text-[12px] text-white h-7 w-7 rounded-lg">
                                    2
                                </span>
                            ) }
                        </li>
                    ) ) }
                </ul>

                <div className="px-6 absolute bottom-6 w-full border-[#efefef] border-t pt-6">
                    <div
                        onClick={ handleLogout }
                        className={ `pl-5 py-3 relative cursor-pointer w-full rounded-lg bg-[#EFEFEF]` }
                    >
                        <div className="flex items-center gap-3">
                            <img className="w-5" src={ logoutIcon } alt="" />
                            <span className=" text-[15pxe] ">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
