import React from 'react'
import Avatar from '../../../assets/2D/avater.svg';

function ChatSectionAvatar() {
  return (
    <div className='flex items-end h-[100%]'>
      <img src={Avatar} alt='Avatar' className='w-sm h-xl'/>
    </div>
  )
}

export default ChatSectionAvatar
