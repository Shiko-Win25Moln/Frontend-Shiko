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
        <div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input value={userName} 
                    onChange={(e) =>
                    setUserName(e.target.value)}
                    placeholder="Enter your name here"
                    className="w-full rounded-x1 border border-form-border bg-body-background px-4 py-3 outline-none transition focus:border-primary" />

                <input value={chatRoom}
                    onChange={(e) =>
                    setChatRoom(e.target.value)}
                    placeholder="Chat Room Name"
                    className="w-full rounded-x1 border border-form-border bg-body-background px-4 py-3 outline-none transition focus:border-primary" />

                <button type="submit"
                    className="w-full rounded-xl bg-primary py-3 font-semibold text-light-text transition hover:opacity-90" >
                    Join
                </button>
            </form>
        </div>
    </>
  )
}