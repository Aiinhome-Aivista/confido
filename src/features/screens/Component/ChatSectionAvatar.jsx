import React, { useContext } from 'react'
import { AuthContext } from '../../../common/helper/AuthContext';
import { SubhoExperience } from '../../characters/subho/subhoExperience';
import { Experience } from '../../characters/hema/experience';
import { SitaExperience } from '../../characters/sita/sitaExperience';
import { RaviExperience } from '../../characters/ravi/raviExperience';

function ChatSectionAvatar() {
  const { selectedAvatar } = useContext(AuthContext)

  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho":
        return <SubhoExperience />;
      case "Sita":
        return <SitaExperience />
      case "Ravi":
        return <RaviExperience />
      case "Hema":
        return <Experience />
      default:
        return (
          <Experience />
        );
    }
  };

  return (
    <div className='flex items-end h-[100%] z-1 -mr-[calc(50%)]'>
      <div className='h-[100%] w-100%'>
        {renderAvatar()}
      </div>
    </div>
  )
}

export default ChatSectionAvatar