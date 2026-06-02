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
        <form onSubmit={handleSubmit} className='rounded-x1 border-form-border p-3'>
            <div className='flex w-full items-center gap-3'>
                <input
                    value={message}
                    onChange={handleInputChange}
                    placeholder='Message...'
                    className='flex-1 bg-transparent text-dark-text outline-none'
                />
                <button type='submit' className='rounded-lg bg-primary px-4 py-2 text-light-text'>
                    Send Message
                </button>
            </div>
        </form>
    </>
  )
}

export default MessageForm