'use client';

import ChatRoom from '@/Components/LiveChat/ChatRoom';
import WaitRoom from '@/Components/LiveChat/WaitRoom';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { useRef, useState } from 'react'

export type Message = {
    time: string
    userName: string
    message: string
}

export default function Livechat() {
    const [connection, setConnection] = useState<HubConnection | null>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const currentUserName = useRef<string>("");
    const currentChatRoom = useRef<string>("");

    const typing = async () => {
        try{
            await connection?.invoke("Typing", currentUserName.current, currentChatRoom.current)
        }
        catch(error:any) {
            console.error("Failed to notify typing", error);
        }
    }

    const stopTyping = async () => {
        try{
            await connection?.invoke("StopTyping", currentUserName.current, currentChatRoom.current)
        }
        catch(error:any) {
            console.error("Failed to notify stop typing", error);
        }
    }

    const sendMessage = async (message:string) => {
        try {
            await connection?.invoke("SendMessage", message);
            await connection?.invoke("StopTyping", currentUserName.current, currentChatRoom.current)
        }
        catch(error:any) {
            console.error("Failed to send message", error);
        }
    }

    const JoinSpecificChatRoom = async (userName:string, chatRoom:string) => {
        try {

            const hubConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:7180/livechathub")
                .build();
            hubConnection.on("ReceiveMessage", (time:string, userName:string, message:string) => {
                setMessages(messages => [...messages, { time, userName, message }]);
            })

            hubConnection.on("Typing", (userName:string) => {
                setTypingUsers(users => [...new Set([...users, userName])]);
            })

            hubConnection.on("StoppedTyping", (userName:string) => {
                setTypingUsers(users => users.filter(x => x != userName));
            })

            await hubConnection.start();
            await hubConnection.invoke("JoinSpecificChatRoom", { userName, chatRoom })

            setConnection(hubConnection)
            currentUserName.current = userName;
            currentChatRoom.current = chatRoom;


        }
        catch(error:any) {
            console.error("Failed to join chat room");
        }
    };

  return (
    <>
        {!connection
            ? <WaitRoom joinSpecificChatRoom={JoinSpecificChatRoom} />
            : <ChatRoom 
                messages={messages}
                sendMessage={sendMessage}
                currentUserName={currentUserName}
                typingUsers={typingUsers}
                typing={typing}
                stopTyping={stopTyping}
            />
        }
    </>
  )
}
