import React from "react";
import terminalIcon from "../../assets/terminal.png";
import mediaIcon from "../../assets/media.png";
import downArrow from "../../assets/arrowDown.png";
import dashImage from "../../assets/dash.png";

import tagIcon from "../../assets/tag.png";
import { useSelector } from "react-redux";


const RightSidebar = () =>
{

    const { selectedChatRoom } = useSelector( state => state.chatRoom )



    return (
        <>
            <div className="h-full w-full px-4 py-6  border-[rgba(200,200,200,.5)] border-l">
                <div className="border-b border-[rgba(200,200,200,.5)] pb-4 mb-3">
                    <div className="bg-[#EFEFEF] w-16 h-16 mx-auto rounded-full flex justify-center items-center">
                        <img src={ tagIcon } alt="terminal icon" className="w-5 " />
                    </div>
                    <h3 className="text-center mt-2 font-medium text-[13px]">
                        { selectedChatRoom?.project?.name }
                    </h3>
                    <p className="text-center font-medium text-[11px] opacity-65">
                        { " " }
                        6 Members
                    </p>
                </div>

                <div className="border-b border-[rgba(200,200,200,.5)] pb-5 mb-4">
                    <h3 className="font-medium text-[13px]">Description</h3>

                    <p className="text-[12px]">
                        { selectedChatRoom?.project?.description?.split( " " ).slice( 0, 13 ).join( " " ) }

                        { selectedChatRoom?.project?.description?.split( " " ).length > 13 && "..." }
                    </p>
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="flex gap-2 items-center font-medium">
                            <img className="w-4" src={ mediaIcon } alt="media icon" />
                            <span className="text-[13px] mt-1">Media</span>
                        </h3>

                        <img className="w-2 mt-1 cursor-no-drop" src={ downArrow } alt="down arrow icon" />
                    </div>

                    <div className="space-y-2 mt-4">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <img
                                    src={ dashImage }
                                    className="w-full h-17 cursor-pointer"
                                    alt="dash image"
                                />
                            </div>

                            <div className="flex-1">
                                <img
                                    src={ dashImage }
                                    className="w-full h-17 cursor-pointer"
                                    alt="dash image"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <img
                                    src={ dashImage }
                                    className="w-full h-17 cursor-pointer"
                                    alt="dash image"
                                />
                            </div>

                            <div className="flex-1">
                                <img
                                    src={ dashImage }
                                    className="w-full h-17 cursor-pointer"
                                    alt="dash image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightSidebar;
