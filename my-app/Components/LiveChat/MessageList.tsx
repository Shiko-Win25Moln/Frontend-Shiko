'use client';

import React, { RefObject, useEffect } from 'react'
import { useRef } from 'react';
import { Message } from '@/app/livechat/page';

type props = {
    messages: Message[]
    currentUserName: RefObject<string>
}


const MessageList = ({ messages, currentUserName } : props) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null) ;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

  return (
    <>
        <div className='h-full overflow-y-auto p-6'>
            {messages.map((item, index) => (
                <div
                    key={index} 
                    className={`mb-6 flex ${
                        item.userName === currentUserName.current ? 'justify-end' : 'justify-start'}`}>

                    <div className='max-w-[70%] rounded-2xl px-4 py-3 shadow-sm'>
                        <p className='mb-1 text-xs text-slate-400'>{item.time}</p>
                        <p className='text-secondary'>{item.message}</p>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    </>
  )
}

export default MessageList