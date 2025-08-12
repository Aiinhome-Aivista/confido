import React from 'react';
import ChatSectionAvatar from './Component/ChatSectionAvatar';
import ChatSectionText from './Component/ChatSectionText';

function ChatScreen() {
  return (
    <div className='h-[calc(100vh)] w-[calc(100vw)] p-[0.5rem]'>

      <div className='bg-blue-400 h-1/10'>header section</div>

      <div className="flex h-9/10">
        <div className='bg-blue-200 w-2/8'>
        <ChatSectionAvatar/>
        </div>

        <div className="flex bg-gray-200 w-6/8">chat section</div>
      </div>
    </div>
  )
}

export default ChatScreen
