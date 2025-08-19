import React from 'react';
import ChatSectionAvatar from './Component/ChatSectionAvatar';
import ChatSectionText from './Component/ChatSectionText';

function ChatScreen() {
  return (
    <div className="flex h-[100%]">
      <div className='w-2/8'>
        <ChatSectionAvatar />
      </div>
      <div className="w-6/8 px-3 z-2">
        <div className="flex justify-center">
          <hr className='text-lg opacity-20 w-[100%]' />
        </div>
        <ChatSectionText />
      </div>
    </div>

  )
}

export default ChatScreen