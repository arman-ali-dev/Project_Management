import React from "react";
import searchIcon from "../../assets/search.png";
import { IconButton } from "@mui/material";
import settingIcon from "../../assets/setting.png";
import RecentFiles from "./RecentFIles";
import PublicFiles from "./PublicFiles";
import plusIcon from "../../assets/plus.png";
import FileDetails from "./FIleDetails";

const Drive = () =>
{
    return (
        <>
            <div className=" mt-4 mx-8 relative">
                <div className="bg-white shadow flex justify-between items-center rounded-lg px-5 py-2.5">
                    <div className="flex gap-2 items-center">
                        <div className="bg-[#EFEFEF] h-8 w-8 rounded-lg flex justify-center items-center">
                            <img className="w-3" src={ searchIcon } alt="" />
                        </div>
                        <input
                            className="placeholder:text-[#000000] border-0 mt-1 outline-0 text-[13px] placeholder:text-[13px] opacity-80"
                            type="text"
                            placeholder="Search files and folders..."
                        />
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
                            <img src={ settingIcon } alt="" className="w-4" />
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
                            <img className="w-3.5" src={ plusIcon } alt="" />
                        </IconButton>
                    </div>
                </div>

                <RecentFiles />
                <div className="grid grid-cols-4">
                    <div className="col-span-3 mr-3">

                        <PublicFiles />
                    </div>

                    <FileDetails />
                </div>
            </div>

        </>
    );
};

export default Drive;
