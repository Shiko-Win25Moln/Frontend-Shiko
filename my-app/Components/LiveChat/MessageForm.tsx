'use client';

import React, { useState, useRef } from 'react'

type MessageFormProps = {
    sendMessage: (message: string) => void;
    typing: () => void;
    stopTyping: () => void;
}

const MessageForm = ({ sendMessage, typing, stopTyping }: MessageFormProps) => {
    const [message, setMessage] = useState<string>("");
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage (e.target.value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typing();

        typingTimeoutRef.current = setTimeout(() => {
            stopTyping();
        }, 2000);
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
        stopTyping();
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
    };

  return (
    <>
        <form onSubmit={handleSubmit} className='sendmessage-form'>
            <div className='container mx-auto py-3'>
                <input
                    value={message}
                    onChange={handleInputChange}
                    className='block w-full mb-3 px-4 py-2 border rounded-md'
                    placeholder='Enter your message'
                />
                <button type='submit' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                    Send Message
                </button>
            </div>
        </form>
    </>
  )
}

export default MessageForm