import React from "react";
import profileIcon from "../../assets/profile.jpg";
import dashImage from "../../assets/dash.png";

const ChatArea = () =>
{
    return (
        <>
            <div className="py-4 space-y-4">
                <div className="flex gap-3 items-start">
                    <img
                        src={ profileIcon }
                        alt="Profile"
                        className="w-7.5 h-7.5 mt-1 rounded-full object-cover"
                    />

                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[13px]">Armaan Ali</p>
                            <span className="h-1 w-1 rounded-full inline-block bg-black"></span>
                            <p className="opacity-30 text-[12px]">10 : 17 AM</p>
                        </div>

                        <div className="bg-[#EAEAEA] text-[12px] mt-0.5  px-3 py-1.5 rounded-bl-lg rounded-tr-lg">
                            Hi team, the server maintenance has been completed!
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <img
                        src={ profileIcon }
                        alt="Profile"
                        className="w-7.5 h-7.5 mt-1 rounded-full object-cover"
                    />

                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[13px]">Armaan Ali</p>
                            <span className="h-1 w-1 rounded-full inline-block bg-black"></span>
                            <p className="opacity-30 text-[12px]">10 : 17 AM</p>
                        </div>

                        <div className="bg-[#EAEAEA] text-[12px] mt-0.5  px-3 py-1.5 rounded-bl-lg rounded-tr-lg">
                            No issues at all. All services are running smoothly.
                        </div>
                    </div>
                </div>

                <div className="flex items-center mt-5">
                    <span className="bg-[#C8C8C8] opacity-40 h-px w-full flex-1"></span>
                    <span className="text-[#B3B3B3]  border px-3 py-1.5 rounded-md border-[rgba(200,200,200,.4)]  text-[11px]">
                        Today
                    </span>
                    <span className="bg-[#C8C8C8] opacity-40 h-px w-full flex-1"></span>
                </div>

                <div className="flex gap-3 items-start">
                    <img
                        src={ profileIcon }
                        alt="Profile"
                        className="w-7.5 h-7.5 mt-1 rounded-full object-cover"
                    />

                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[13px]">Armaan Ali</p>
                            <span className="h-1 w-1 rounded-full inline-block bg-black"></span>
                            <p className="opacity-30 text-[12px]">10 : 17 AM</p>
                        </div>

                        <div className="bg-[#EAEAEA] text-[12px] mt-0.5  px-3 py-1.5 rounded-bl-lg rounded-tr-lg">
                            Great! Did you face any issues?
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 items-start">
                    <div>
                        <div className="flex gap-2 justify-end items-center">
                            <p className="opacity-30 text-[12px]">10 : 17 AM</p>
                            <span className="h-1 w-1 rounded-full inline-block bg-black"></span>
                            <p className="text-[13px]">You</p>
                        </div>

                        <div className="bg-[#EAEAEA] text-[12px] mt-0.5  px-3 py-1.5 rounded-bl-lg rounded-tr-lg">
                            Good work, IT team
                        </div>
                    </div>
                </div>

                <div className="flex justify-end ">
                    <img src={ dashImage } alt="Dash" className="w-48 h-30" />
                </div>
            </div>
        </>
    );
};

export default ChatArea;
