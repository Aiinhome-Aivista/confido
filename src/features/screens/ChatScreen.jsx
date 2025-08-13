import React from 'react';
import ChatSectionAvatar from './Component/ChatSectionAvatar';
import ChatSectionText from './Component/ChatSectionText';

function ChatScreen() {
  return (
    <div className='h-[calc(100vh)] w-[calc(100vw)] p-[0.5rem]'>

      <div className='bg-blue-400 h-1/10'>header section</div>

      <div className="flex h-9/10 bg-[#FFFFFF]/90">
        <div className='w-2/8'>
          <ChatSectionAvatar />
        </div>
        <div className="w-6/8 px-3">
          <ChatSectionText />
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
