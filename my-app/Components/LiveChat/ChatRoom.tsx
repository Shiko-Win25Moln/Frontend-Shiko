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
        <div className='chat-room'>
            <div className='container'>
                <h3>Chat Room</h3>
                <MessageList messages={messages} currentUserName={currentUserName} />
            </div>
            <UserTypingNotification typingUsers={typingUsers} />
            <MessageForm sendMessage={sendMessage} typing={typing} stopTyping={stopTyping} />
        </div>
    </>
  )
}
