import React from "react";
import trendIcon from "../../assets/trend.png";
import { MenuItem, Select } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const FilesUploadedCard = () =>
{
    return (
        <div className="rounded-2xl shadow px-6 py-5 bg-white">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex gap-3 ">
                        <h3 className="text-[19px] font-medium opacity-85">
                            Files Uploaded
                        </h3>
                        <img src={ trendIcon } className="w-6 h-6 opacity-75" alt="" />
                    </div>

                    <p className="text-[13px] font-medium opacity-75">
                        Overview of Last 6 Month Document Activity
                    </p>
                </div>

                <Select
                    defaultValue=""
                    displayEmpty
                    className="outline-none text-[13px] font-medium w-32.5"
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
                        Last 6 Months
                    </MenuItem>
                    <MenuItem value="status2" sx={ { fontSize: "13px" } }>
                        Can View
                    </MenuItem>
                    <MenuItem value="status3" sx={ { fontSize: "13px" } }>
                        Admin
                    </MenuItem>
                </Select>
            </div>

            <div className="mt-5">
                <div className="flex gap-2 items-center">
                    <span className="bg-[#18A322] opacity-90 h-3.5 w-3.5 rounded-full inline-block"></span>
                    <p className="text-[15px] mt-px opacity-80">Files Uploaded</p>
                </div>
                <LineChart
                    xAxis={ [
                        {
                            data: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun" ],
                            scaleType: "band",
                            disableTicks: true,
                        },
                    ] }
                    margin={ { left: -10, right: 20, top: 20, bottom: 0 } }
                    series={ [
                        {
                            data: [ 70, 150, 220, 350, 420, 580 ],
                            area: true,
                            color: "#2bb381",
                            curve: "linear",
                            showMark: true,
                        },
                    ] }
                    height={ 320 }
                    sx={ {
                        "& .MuiAreaElement-root": {
                            fill: "url(#gradient-green)",
                            opacity: 0.2,
                        },
                        "& .MuiLineElement-root": {
                            strokeWidth: 2,
                        },
                        "& .MuiMarkElement-root": {
                            stroke: "#2bb381",
                            fill: "#fff",
                            strokeWidth: 2,
                        },
                    } }
                >
                    <defs>
                        <linearGradient id="gradient-green" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2bb381" stopOpacity={ 0.8 } />
                            <stop offset="95%" stopColor="#2bb381" stopOpacity={ 0 } />
                        </linearGradient>
                    </defs>
                </LineChart>
            </div>
        </div>
    );
};

export default FilesUploadedCard;
