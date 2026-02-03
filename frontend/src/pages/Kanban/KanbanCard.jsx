import React from "react";
import chronometerIcon from "../../assets/chronometer.png";
import teamIcon from "../../assets/team.png";
import messageIcon from "../../assets/mes.png";
import profilePic from "../../assets/profile.jpg";
import profilePic2 from "../../assets/profile2.jpg";
import { IconButton } from "@mui/material";
import plusIcon from "../../assets/plus.png";

const KanbanCard = () =>
{
    return (
        <>
            <div className="border-[rgba(221,221,221,.7)] relative border px-5 py-4 rounded-md">
                <h3 className="text-[14px] font-medium">1. UI/UX Designing</h3>
                <p className="text-[12px] text-[#969696] mt-0.5 flex gap-3">
                    <span>20 Jan 2025 </span> <span> | </span>
                    <span className="flex items-center gap-1">
                        <img
                            src={ chronometerIcon }
                            alt="chronometer icon"
                            className="w-3 h-3 mr-1 inline-block"
                        />
                        2 : 40
                    </span>
                </p>

                <div className="space-x-2 mt-4">
                    <div className="text-[#497AF5] bg-[rgba(73,122,245,0.1)] px-3 py-2 rounded-md text-[12px] inline-block">
                        LOGO
                    </div>
                    <div className="text-[#E8D11E] bg-[rgba(240,222,80,0.2)] px-3 py-2 rounded-md text-[12px] inline-block">
                        QA
                    </div>
                </div>

                <p className="text-[13px] font-medium mt-2.5">
                    Create design for our new project. Let’s research for best practices.
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                        <div className="flex gap-1.5 items-center">
                            <img src={ teamIcon } alt="team icon" className="w-4.5 h-4.5 " />
                            <span className="text-[#969696] text-[11px]">2</span>
                        </div>

                        <div className="flex gap-1.5 items-center">
                            <img src={ messageIcon } alt="message icon" className="w-3 h-3 " />
                            <span className="text-[#969696] text-[11px]">0</span>
                        </div>
                    </div>

                    <div className="flex">
                        <IconButton
                            sx={ {
                                width: 33,
                                height: 33,
                                backgroundColor: "#EFEFEF",
                                cursor: "pointer",
                                borderRadius: "50px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "10px",
                                "&:hover": {
                                    backgroundColor: "#EFEFEF",
                                },
                            } }
                        >
                            <img className="w-3" src={ plusIcon } alt="" />
                        </IconButton>
                        <img
                            className="w-7.5 h-7.5 -mr-4 z-50 relative border-white border rounded-full object-cover"
                            src={ profilePic }
                            alt=""
                        />
                        <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={ profilePic2 }
                            alt=""
                        />
                    </div>
                </div>

                <div className="h-10 w-0.5 rounded-md bg-[#497AF5] lineShadow absolute left-0 top-4"></div>
            </div>
        </>
    );
};

export default KanbanCard;
