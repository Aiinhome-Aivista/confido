import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../common/helper/AuthContext';
import { SubhoExperience } from '../../characters/subho/subhoExperience';
import { Experience } from '../../characters/hema/experience';
import { SitaExperience } from '../../characters/sita/sitaExperience';
import { RaviExperience } from '../../characters/ravi/raviExperience';
import SpeakerOn from '../../../assets/icons/volume_up.svg';
import SpeakerOff from '../../../assets/icons/volume_off.svg';
import { Howler } from "howler";

function ChatSectionAvatar() {
  const { selectedAvatar, setGreeting } = useContext(AuthContext)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  useEffect(() => {
    setGreeting(false)
  }, [selectedAvatar])

  const handleToggle = () => {
    setIsSpeakerOn((prev) => {
      const newState = !prev;
      Howler.mute(!newState); // mute globally
      return newState;
    });
  };


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
    <>
      <div onClick={handleToggle}
        className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition ">
        <img
          src={isSpeakerOn ? SpeakerOn : SpeakerOff}
          alt={isSpeakerOn ? "Speaker On" : "Speaker Off"}
        />
      </div>
      <div className='flex items-end h-[100%] z-1 -mr-[calc(50%)]'>
        {renderAvatar()}
      </div>
    </>
  )
}

export default ChatSectionAvatar