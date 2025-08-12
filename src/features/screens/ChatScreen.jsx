import React from 'react';
import ChatSectionAvatar from './Component/ChatSectionAvatar';
import ChatSectionText from './Component/ChatSectionText';

function ChatScreen() {
  return (
    <div className='h-[calc(100vh)] w-[calc(100vw)] p-[0.5rem]'>

      <div className='bg-blue-400 h-1/10'>header section</div>

      <div className="flex h-9/10">
        <div className='bg-blue-200 w-2/8'>
          <ChatSectionAvatar />
        </div>
        <div className="flex flex-col justify-between bg-gray-400 w-6/8">
          <div className=''>chat scrollbar</div>
          <div className=''>input field</div>
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
