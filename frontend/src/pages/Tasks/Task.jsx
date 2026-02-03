import React from "react";
import dragIcon from "../../assets/drag.png";
import messageIcon from "../../assets/mes.png";
import profilePic from "../../assets/profile.jpg";
import profilePic2 from "../../assets/profile2.jpg";
import menuIcon from "../../assets/menu.png";

const Task = () =>
{
    return (
        <>
            <div className="bg-[#EFEFEF] w-full px-5 flex justify-between items-center py-2 rounded-xl">
                <div className="flex gap-7 items-center ">
                    <img className="w-5 cursor-grab" src={ dragIcon } alt="" />

                    <p className="text-[13px] font-medium">Logo Design</p>
                </div>

                <p className="text-[13px]">
                    Create design for our new project. Let’s...
                </p>

                <p className="text-[11px] flex items-start gap-1.5 font-medium">
                    <img src={ messageIcon } alt="Message Icon" className="w-3.5" /> 3
                    Conversations
                </p>


                <div className="flex">
                    <img
                        className="w-6.5 h-6.5 -mr-3.5 z-50 relative border-white border rounded-full object-cover"
                        src={ profilePic }
                        alt=""
                    />
                    <img
                        className="w-7 h-7 rounded-full object-cover"
                        src={ profilePic2 }
                        alt=""
                    />
                </div>

                <div className="text-[#497AF5] bg-[rgba(73,122,245,0.1)] px-3 py-1.5 rounded-md text-[11px] font-medium inline-block">
                    Desgin
                </div>

                <div>
                    <img src={ menuIcon } alt="menu icon" className="w-4.5 h-4.5 " />
                </div>
            </div>
        </>
    );
};

export default Task;
