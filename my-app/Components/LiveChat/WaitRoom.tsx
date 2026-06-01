'use client';
import { useState } from "react";

type props = {
    joinSpecificChatRoom: (userName: string, chatRoom: string) => Promise<void>
}

export default function WaitRoom({ joinSpecificChatRoom }: props) {
    const [userName, setUserName] = useState<string>("");
    const [chatRoom, setChatRoom] = useState<string>("standard");

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        joinSpecificChatRoom(userName, chatRoom);
    };

  return (
    <>
        <div className="container py-3">
            <form onSubmit={handleSubmit}>
                <input value={userName} onChange={(e) => 
                    setUserName(e.target.value)} placeholder="Enter your name" className="block w-full mb-3 px-4 py-2 border rounded-md" />
                <input value={chatRoom} onChange={(e) => 
                    setChatRoom(e.target.value)} placeholder="chatroom" className="block w-full mb-3 px-4 py-2 border rounded-md" />
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >Join</button>
            </form>
        </div>
    </>
  )
}
