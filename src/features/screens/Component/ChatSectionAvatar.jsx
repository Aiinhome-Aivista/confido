import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../../../common/helper/AuthContext';
import { SubhoExperience } from '../../characters/subho/subhoExperience';
import { Experience } from '../../characters/hema/experience';
import { SitaExperience } from '../../characters/sita/sitaExperience';
import { RaviExperience } from '../../characters/ravi/raviExperience';

function ChatSectionAvatar() {
  const { selectedAvatar, setGreeting } = useContext(AuthContext);

  useEffect(() => {
    setGreeting(false);
  }, [selectedAvatar]);


  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho": return <SubhoExperience disableWave />;
      case "Sita": return <SitaExperience disableWave />;
      case "Ravi": return <RaviExperience disableWave />;
      case "Hema": return <Experience disableWave />;
      default: return <Experience />;
    }
  };

  return (
    <>
      <div className="flex items-end h-[100%] z-1 -mr-[calc(50%)]">
        {renderAvatar()}
      </div>
    </>
  )
}

export default ChatSectionAvatar;

