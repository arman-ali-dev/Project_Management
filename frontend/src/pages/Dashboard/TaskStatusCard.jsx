import { Button, MenuItem, Select } from "@mui/material";
import React from "react";
import CreateNewTaskForm from "./CreateNewTaskForm";

const TaskStatusCard = () =>
{
    const [ open, setOpen ] = React.useState( false );

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

    return (
        <>
            <div
                onClick={ toggleDrawer( false ) }
                className="rounded-2xl flex flex-col justify-between shadow px-6 py-5 bg-white h-full"
            >
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-[16px] font-medium opacity-85">Task Status</h3>

                        <Select
                            defaultValue=""
                            displayEmpty
                            className="outline-none text-[13px] font-medium w-21.5"
                            sx={ {
                                height: "32px",
                                borderRadius: "8px",
                                backgroundColor: "#ffffff",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #E0E0E0",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BCBCBC",
                                },
                                "& .MuiSelect-select": {
                                    paddingLeft: "10px",
                                    paddingRight: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    opacity: ".8",
                                },
                                "& .MuiSvgIcon-root": {
                                    right: "2px",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                },
                            } }
                        >
                            <MenuItem value="" sx={ { fontSize: "13px" } }>
                                Today
                            </MenuItem>
                            <MenuItem value="status2" sx={ { fontSize: "13px" } }>
                                Can View
                            </MenuItem>
                            <MenuItem value="status3" sx={ { fontSize: "13px" } }>
                                Admin
                            </MenuItem>
                        </Select>
                    </div>

                    <div className="mt-2">
                        <h3 className="font-semibold text-[25px] opacity-85">68</h3>
                        <p className="font-medium text-[12px] opacity-85 -mt-0.5">
                            Task Right Now This Month
                        </p>
                    </div>

                    <div className="flex gap-1 mt-5">
                        <span className="inline-block w-[40%] rounded-l-sm h-1.5 bg-[#18A322]"></span>
                        <span className="inline-block w-[35%] h-1.5 bg-[#157FD7]"></span>
                        <span className="inline-block w-[25%] rounded-r-sm h-1.5 bg-[#F55600]"></span>
                    </div>

                    <div className="mt-7 space-y-3">
                        <div className="flex justify-between items-center border-[#CEC6C6] border-b pb-2">
                            <div className="flex gap-1.5 items-center">
                                <span className="inline-block h-4 w-4 rounded-sm bg-[#157FD7]"></span>
                                <p className="text-[13px] mt-0.5 font-medium">To-Do</p>
                            </div>

                            <div className="text-[11px] px-2 py-0.5 rounded-sm text-[#157FD7] bg-[rgba(21,127,215,.2)] font-medium">
                                +12
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-[#CEC6C6] border-b pb-2">
                            <div className="flex gap-1.5 items-center">
                                <span className="inline-block h-4 w-4 rounded-sm bg-[#F55600]"></span>
                                <p className="text-[13px] mt-0.5 font-medium">In Progress</p>
                            </div>

                            <div className="text-[11px] px-2 py-0.5 rounded-sm text-[#F55600] bg-[rgba(245,86,0,.2)] font-medium">
                                +30
                            </div>
                        </div>

                        <div className="flex justify-between items-center ">
                            <div className="flex gap-1.5 items-center">
                                <span className="inline-block h-4 w-4 rounded-sm bg-[#18A322]"></span>
                                <p className="text-[13px] mt-0.5 font-medium">To-Do</p>
                            </div>

                            <div className="text-[11px] px-2 py-0.5 rounded-sm text-[#18A322] bg-[rgba(24,163,34,.2)] font-medium">
                                +12
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Button
                        onClick={ ( e ) =>
                        {
                            e.stopPropagation();
                            toggleDrawer( true )( e );
                        } }
                        fullWidth
                        sx={ {
                            textTransform: "capitalize",
                            backgroundColor: "#000",
                            border: "1px solid #000",
                            color: "#fff",
                            paddingX: "20px",
                            fontSize: "13px",
                            borderRadius: "5px",
                        } }
                    >
                        <span>Create New Task</span>
                    </Button>
                </div>
            </div>

            <CreateNewTaskForm toggleDrawer={ toggleDrawer } open={ open } />
        </>
    );
};

export default TaskStatusCard;
