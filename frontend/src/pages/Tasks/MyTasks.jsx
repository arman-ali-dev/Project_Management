import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import filterIcon from "../../assets/filter.png";
import meIcon from '../../assets/me.png';
import Task from "./Task";

const MyTasks = () =>
{

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


    return (
        <>
            <div className=" mt-4 mx-8 relative">
                <div className="bg-white shadow flex justify-between items-center rounded-lg px-5 py-2.5">
                    <div className="flex gap-2.5 items-center">

                        <img className="w-7" src={ meIcon } alt="" />
                        <p className="text-[14px] font-semibold">My Tasks</p>
                    </div>

                    <div>
                        <IconButton
                            onClick={ handleClick }
                            sx={ {
                                width: 36,
                                height: 36,
                                backgroundColor: "#EFEFEF",
                                cursor: "pointer",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#EFEFEF",
                                },
                            } }
                        >
                            <img src={ filterIcon } alt="" className="w-4" />
                        </IconButton>

                        <Menu
                            anchorEl={ filterAnchorEl }
                            open={ openFilterDropDown }
                            onClose={ handleCloseFilterDropDown }
                            PaperProps={ {
                                sx: { width: 180, borderRadius: "8px" },
                            } }
                        >
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                All Projects
                            </MenuItem>

                            <Divider />

                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Active Projects
                            </MenuItem>
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Completed Projects
                            </MenuItem>
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                On Hold
                            </MenuItem>
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Archived
                            </MenuItem>

                            <Divider />

                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Ending Soon
                            </MenuItem>
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Overdue Projects
                            </MenuItem>

                            <Divider />

                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                High Priority
                            </MenuItem>
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Medium Priority
                            </MenuItem>
                            <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                Low Priority
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="mt-6 shadow rounded-xl bg-white px-5 py-4">
                    <div className="flex gap-3 items-center">
                        <p className="text-[15px] font-semibold ">To-Do</p>
                        <p className="text-[13px] font-semibold -mt-2 -ml-2">(4)</p>
                    </div>

                    <div className="mt-3 space-y-2">
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>

                <div className="mt-4 shadow rounded-xl bg-white px-5 py-4">
                    <div className="flex gap-3 items-center">
                        <p className="text-[15px] font-semibold ">Doing</p>
                        <p className="text-[13px] font-semibold -mt-2 -ml-2">(2)</p>
                    </div>

                    <div className="mt-3 space-y-2">
                        <Task />
                        <Task />
                    </div>
                </div>

                <div className="mt-4 shadow rounded-xl bg-white px-5 py-4">
                    <div className="flex gap-3 items-center">
                        <p className="text-[15px] font-semibold ">Done</p>
                        <p className="text-[13px] font-semibold -mt-2 -ml-2">(3)</p>
                    </div>

                    <div className="mt-3 space-y-2">
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>

            </div>


        </>
    )
}

export default MyTasks;