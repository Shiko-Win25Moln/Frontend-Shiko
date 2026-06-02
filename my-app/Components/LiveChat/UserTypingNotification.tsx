import React from 'react'

type props = {
    typingUsers: string[];
};

export default function UserTypingNotification({ typingUsers }: props) {
    if (typingUsers.length === 0) {
        return null;
    }

  return (
    <>
        <div className='flex items-center gap-3 text-sm text-dark-text'>
            <span>
                {typingUsers.join(", ")}
                {typingUsers.length > 1 ? " are typing..." : " is typing..."}
            </span>
            
            <div className='container'>
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400' />
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]' />
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]' />
                {/* {typingUsers.map((userName) =>  (
                    <div key={userName}>
                        {userName} ...
                    </div>
                ))} */}
            </div>
        </div>
    </>
  );
}
