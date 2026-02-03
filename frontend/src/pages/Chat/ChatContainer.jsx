import React from "react";
import ChatHeader from "./ChatHeader";
import sendIcon from "../../assets/send.png";
import attachFileIcon from "../../assets/attach.png";
import ChatArea from "./ChatArea";

const ChatContainer = () =>
{
    return (
        <div className="h-full w-full flex flex-col">
            <ChatHeader />

            <div className="flex-1 px-4 relative">

                <ChatArea />

                <div className="absolute bottom-4 left-4 right-4">
                    <form className="relative">
                        <input
                            type="text"
                            placeholder="Write Message..."
                            className="text-[13px] placeholder:text-[12px] outline-0 border-[rgba(200,200,200,.5)] border w-full py-2.5 pl-10 pr-4 rounded-md"
                        />

                        <button className="bg-black px-3 py-2 rounded-md absolute top-1/2 -translate-y-1/2 right-2">
                            <img
                                src={ sendIcon }
                                alt="Send"
                                className="w-4 h-4 filter invert brightness-0"
                            />
                        </button>
                        <img
                            src={ attachFileIcon }
                            alt="Attach File"
                            className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;
