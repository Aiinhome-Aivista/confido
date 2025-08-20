import React from 'react';
import ChatSectionAvatar from './Component/ChatSectionAvatar';
import ChatSectionText from './Component/ChatSectionText';
import { useContext } from 'react';
import { AuthContext } from '../../common/helper/AuthContext.jsx';
import ChooseAvatar from '../../components/select_avatar.jsx';

function ChatScreen() {
  const { sessionTerminated } = useContext(AuthContext);

  if (sessionTerminated) {
    return <ChooseAvatar />;
  }

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