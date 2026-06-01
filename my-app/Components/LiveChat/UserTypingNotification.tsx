import React from 'react'

type props = {
    typingUsers: string[];
};

export default function UserTypingNotification({ typingUsers }: props) {
  return (
    <>
        <div className='#'>
            <div className='container'>
                {typingUsers.map((userName) =>  (
                    <div key={userName}>
                        {userName} ...
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}
