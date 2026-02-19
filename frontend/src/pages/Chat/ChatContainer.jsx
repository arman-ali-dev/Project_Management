import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatHeader from "./ChatHeader";
import ChatArea from "./ChatArea";
import sendIcon from "../../assets/send.png";
import attachFileIcon from "../../assets/attach.png";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchMessages } from "../../redux/member/chatSlice";

const ChatContainer = () =>
{

    const dispatch = useDispatch();
    const { messages } = useSelector( state => state.chat );
    const { user } = useSelector( state => state.user )



    const { selectedChatRoom } = useSelector( state => state.chatRoom )
    const currentUserId = user?.id;

    const [ input, setInput ] = useState( "" );
    const clientRef = useRef( null );

    const chatEndRef = useRef( null );

    useEffect( () =>
    {
        chatEndRef.current?.scrollIntoView( { behavior: "smooth" } );
    }, [ messages ] );


    useEffect( () =>
    {
        dispatch( fetchMessages( selectedChatRoom?.id ) );
    }, [ selectedChatRoom ] );

    useEffect( () =>
    {

        const token = localStorage.getItem( "jwt" );

        const client = new Client( {
            webSocketFactory: () => new SockJS( "http://localhost:8080/ws" ),

            connectHeaders: {
                Authorization: `Bearer ${ token }`,
            },

            reconnectDelay: 5000,

            onConnect: () =>
            {
                console.log( "Connected" );

                client.subscribe( `/topic/room/${ selectedChatRoom?.id }`, ( message ) =>
                {
                    const received = JSON.parse( message.body );
                    dispatch( addMessage( received ) )
                } );
            },

            onStompError: ( frame ) =>
            {
                console.error( "Broker error:", frame.headers[ "message" ] );
            },

            onWebSocketError: ( error ) =>
            {
                console.error( "WebSocket error:", error );
            }
        } );

        client.activate();
        clientRef.current = client;

        return () =>
        {
            if ( client.active )
            {
                client.deactivate();
            }
        };

    }, [ selectedChatRoom?.id ] );
    const handleSubmit = ( e ) =>
    {
        e.preventDefault();

        if ( !input.trim() ) return;

        clientRef.current.publish( {
            destination: `/app/chat.sendMessage/${ selectedChatRoom?.id }`,
            body: JSON.stringify( {
                senderId: currentUserId,
                content: input,
                type: "TEXT"
            } )
        } );

        setInput( "" );
    };

    return (
        <div className="h-full w-full flex flex-col">
            <ChatHeader />

            <div className="flex-1 flex flex-col min-h-0 pb-4">

                <div className="flex-1 overflow-y-auto px-4  chat-scroll min-h-0">
                    <ChatArea
                        messages={ messages }
                        currentUserId={ currentUserId }
                    />
                    <div ref={ chatEndRef } />
                </div>


                <div className="pt-3 px-4 ">
                    <form className="relative" onSubmit={ handleSubmit }>
                        <input
                            value={ input }
                            onChange={ ( e ) => setInput( e.target.value ) }
                            type="text"
                            placeholder="Write Message..."
                            className="text-[13px] outline-0 border border-gray-300 w-full py-2.5 pl-10 pr-12 rounded-md"
                        />

                        <button
                            type="submit"
                            className="bg-black px-3 py-2 rounded-md absolute top-1/2 -translate-y-1/2 right-2"
                        >
                            <img
                                src={ sendIcon }
                                alt="Send"
                                className="w-4 h-4 filter invert"
                            />
                        </button>

                        <img
                            src={ attachFileIcon }
                            alt="Attach"
                            className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;