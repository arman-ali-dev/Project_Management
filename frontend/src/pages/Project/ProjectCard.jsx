import React from "react";
import projectLogo from "../../assets/ahitlogo.webp";
import externalIcon from "../../assets/external.png";
import { Link, useNavigate } from "react-router-dom";
import clockIcon from "../../assets/clock.png";
import profilePic from "../../assets/profile.jpg";
import profilePic2 from "../../assets/profile2.jpg";

const ProjectCard = () =>
{
    const navigate = useNavigate();
    return (
        <>
            <div
                onClick={ () => navigate( "/projects/123/kanban" ) }
                className="bg-white cursor-pointer rounded-xl shadow px-6 py-5"
            >
                <img className="w-16" src={ projectLogo } alt="" />

                <h3 className="font-medium opacity-80 text-[14px] mt-2.5">
                    AHIT Tecno
                </h3>

                <Link className="text-[#747373] font-medium -mt-1 text-[12px] flex gap-1 items-center">
                    <img className="w-2.5" src={ externalIcon } alt="" />
                    <span>ahitechno.com</span>
                </Link>

                <p className="text-[13.5px] font-medium mt-4">
                    Web Resource which contains all about tours in the jaipur city
                </p>

                <div className="mt-5">
                    <p className="text-[13px] text-right  font-medium">30%</p>
                    <div className="h-1 w-full bg-[#D4D9D4]">
                        <div className="bg-[#FA2626] h-1  w-[30%]"></div>
                    </div>
                </div>

                <div className=" mt-6 flex justify-between items-center">
                    <div className="bg-[#ebebeb] rounded-md flex gap-2  items-center py-1.5 px-3 text-[#605D5D] text-[11px]">
                        <img className="w-3" src={ clockIcon } alt="" />{ " " }
                        <span className="font-medium"> 9 days left</span>
                    </div>

                    <div className="flex">
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
            </div>
        </>
    );
};

export default ProjectCard;
