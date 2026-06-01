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
        <div className='message-list'>
            {messages.map((item, index) => (
                <div key={index} className={`chat-row ${item.userName === currentUserName.current ? 'right' : 'left'}`}>
                    <div className='chat-bubble'>
                        <div className='time'>{item.time}</div>
                        <div className='message'>{item.message}</div>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    </>
  )
}

export default MessageList
