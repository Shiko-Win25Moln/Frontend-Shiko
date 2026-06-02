import { RefObject } from 'react'
import MessageList from './MessageList'
import UserTypingNotification from './UserTypingNotification'
import MessageForm from './MessageForm'
import { Message } from '@/app/livechat/page'

type props = {
    messages: Message[]
    sendMessage: (message: string) => Promise<void>
    currentUserName: RefObject<string>
    typingUsers: string[]
    typing: () => Promise<void>
    stopTyping: () => Promise<void>
}

export default function ChatRoom({ messages, sendMessage, currentUserName, typingUsers, typing, stopTyping } : props) {
  return (
    <>
        <div className='flex h-full flex-col rounded-3x1 bg-body-background'>
            <div className='border-b border-form-border px-8 py-6'>
                <h3 className='text-3x1 font-bold text-secondary'>Live Chat</h3>
                <button className='rounded-full bg-body-background p-2'>•••</button>
            </div>
            <div className='flex-1 overflow-hidden bg-body-background'>
                <MessageList messages={messages} currentUserName={currentUserName} />
            </div>
            <div className='min-h-10 px-6 py-2 text-sm text-dark-text'>
                <UserTypingNotification typingUsers={typingUsers} />
            </div>
            <div className='border-t border-form-border bg-body-background p-6'>
                <MessageForm sendMessage={sendMessage} typing={typing} stopTyping={stopTyping} />
            </div>
        </div>
    </>
  )
}
