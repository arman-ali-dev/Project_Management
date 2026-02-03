import React from "react";
import { IconButton } from "@mui/material";
import speechIcon from "../../assets/speech.png";
import heartIcon from "../../assets/like.png";
import ahitLogo from "../../assets/ahitlogo.webp";
import downChevron from "../../assets/down.png";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () =>
{
    return (
        <>
            <div className=" mt-4 mx-8 relative">
                <div className="bg-white shadow flex justify-between items-center rounded-lg px-5 py-2.5">
                    <div className="flex gap-2 items-center">
                        <div>
                            <img src={ ahitLogo } alt="AHIT Logo" className=" h-8" />
                        </div>

                        <div>
                            <h3 className="text-[13px] font-semibold m-0">
                                Ahit Tecno's Website
                            </h3>
                            <p className="text-[11px] flex items-center text-[#555454]  -mt-1 font-semibold">
                                Change Project
                                <img
                                    src={ downChevron }
                                    alt="Down Chevron"
                                    className="w-2.5 h-2.5 ml-1"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <IconButton
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
                            <img src={ speechIcon } alt="" className="w-4" />
                        </IconButton>

                        <IconButton
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
                            <img className="w-3.5" src={ heartIcon } alt="" />
                        </IconButton>
                    </div>
                </div>

                <div className="flex gap-6 mt-6 pb-4">
                    <KanbanColumn
                        title="To Do"
                        status="todo"
                    />

                    {/* <KanbanColumn
                        title="In Progress"
                        status="in_progress"
                    />

                    <KanbanColumn
                        title="Done"
                        status="done"
                    /> */}

                </div>

            </div>
        </>
    );
};

export default KanbanBoard;
