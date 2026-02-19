import React from "react";
import profileIcon from "../../assets/profile.jpg";
import dashImage from "../../assets/dash.png";
import userAvatar from '../../assets/userAvatar.png'


const ChatArea = ( { messages, currentUserId } ) =>
{

    return (
        <div className="py-4 space-y-4">

            { messages.map( ( msg, index ) =>
            {

                const isMine = msg.sender?.id === currentUserId;

                return (
                    <div
                        key={ index }
                        className={ `flex gap-3 items-start ${ isMine ? "justify-end" : "" }` }
                    >

                        { !isMine && (
                            <img
                                src={ msg.sender?.profileImage || userAvatar }
                                alt="Profile"
                                className="w-7.5 h-7.5 mt-1 rounded-full object-cover"
                            />
                        ) }

                        <div>

                            <div className={ `flex gap-2 items-center ${ isMine ? "justify-end" : "" }` }>

                                { !isMine && (
                                    <>
                                        <p className="text-[13px]">
                                            { msg.sender?.fullName || "User" }
                                        </p>
                                        <span className="h-1 w-1 bg-black rounded-full"></span>
                                    </>
                                ) }

                                <p className="opacity-30 text-[12px]">
                                    { msg.sentAt
                                        ? new Date( msg.sentAt ).toLocaleTimeString()
                                        : "" }
                                </p>

                                { isMine && (
                                    <>
                                        <span className="h-1 w-1 bg-black rounded-full"></span>
                                        <p className="text-[13px]">You</p>
                                    </>
                                ) }

                            </div>

                            <div className="bg-[#EAEAEA] text-[12px] mt-0.5 px-3 py-1.5 rounded-bl-lg rounded-tr-lg">
                                { msg.content }
                            </div>

                        </div>
                    </div>
                );
            } ) }

        </div>
    );
};

export default ChatArea;