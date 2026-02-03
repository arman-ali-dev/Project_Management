import React from "react";
import LeftSidebar from "./LeftSidebar";
import ChatContainer from "./ChatContainer";
import RightSidebar from "./RightSidebar";

const Chat = () =>
{
    return (
        <>
            <div className="bg-white rounded-lg shadow h-[87vh] m-4">
                <div className="grid grid-cols-9 h-full">
                    <div className="col-span-2">
                        <LeftSidebar />
                    </div>

                    <div className="col-span-5">
                        <ChatContainer />
                    </div>


                    <div className="col-span-2">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat