import React from "react";
import plusIcon from "../../assets/plus.png";
import { IconButton } from "@mui/material";
import KanbanCard from "./KanbanCard";
import menuIcon from "../../assets/menu.png";

const KanbanColumn = () =>
{
    return (
        <>
            <div className="bg-white px-4 py-6  rounded-lg shadow w-90">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <IconButton
                            sx={ {
                                width: 38,
                                height: 38,
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
                            <img className="w-3.5" src={ plusIcon } alt="" />
                        </IconButton>

                        <p className="text-[15px] font-semibold ">To-Do</p>
                        <p className="text-[13px] font-semibold -mt-2 -ml-2">(3)</p>
                    </div>

                    <div>
                        <img src={ menuIcon } alt="menu icon" className="w-5 h-5 " />
                    </div>
                </div>

                <div className="mt-5 space-y-4">
                    <KanbanCard />
                    <KanbanCard />
                </div>
            </div>
        </>
    );
};

export default KanbanColumn;
