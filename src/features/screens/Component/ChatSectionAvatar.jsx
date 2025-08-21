import React, { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../../common/helper/AuthContext';
import { SubhoExperience } from '../../characters/subho/subhoExperience';
import { Experience } from '../../characters/hema/experience';
import { SitaExperience } from '../../characters/sita/sitaExperience';
import { RaviExperience } from '../../characters/ravi/raviExperience';
import SpeakerOn from '../../../assets/icons/volume_up.svg';
import SpeakerOff from '../../../assets/icons/volume_off.svg';

function ChatSectionAvatar() {
  const { selectedAvatar, setGreeting } = useContext(AuthContext)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const audioObjectsRef = useRef([]);
  const isSpeakerOnRef = useRef(true); //  keep latest value available everywhere

  useEffect(() => {
    setGreeting(false);
  }, [selectedAvatar]);

  //  Intercept Audio constructor
  useEffect(() => {
    const OriginalAudio = window.Audio;
    window.Audio = function (...args) {
      const audio = new OriginalAudio(...args);

      // Always apply latest mute state
      audio.muted = !isSpeakerOnRef.current;

      audioObjectsRef.current.push(audio);
      return audio;
    };

    return () => {
      // cleanup: restore original Audio
      window.Audio = OriginalAudio;
      audioObjectsRef.current.forEach(a => a.pause());
      audioObjectsRef.current = [];
    };
  }, []);

  //  When toggle changes, update ref + mute all existing audios
  useEffect(() => {
    isSpeakerOnRef.current = isSpeakerOn; // keep latest state
    audioObjectsRef.current.forEach(a => {
      a.muted = !isSpeakerOn;
    });
  }, [isSpeakerOn]);

  const handleToggle = () => {
    setIsSpeakerOn(prev => !prev);
  };

  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho": return <SubhoExperience disableWave />;
      case "Sita": return <SitaExperience disableWave/>;
      case "Ravi": return <RaviExperience disableWave/>;
      case "Hema": return <Experience disableWave />;
      default: return <Experience />;
    }
  };

  return (
    <>
      <div className='flesx items-center justify-between w-full h-[100%] relative'>
        <div className='pl-5'>
          <div
            onClick={handleToggle}
            className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition
          "
          >
            <img
              src={isSpeakerOn ? SpeakerOn : SpeakerOff}
              alt={isSpeakerOn ? "Speaker On" : "Speaker Off"}
            />
          </div>
        </div>
        <div className="flex items-end h-[100%] z-1 -mr-[calc(50%)]">
          {renderAvatar()}
        </div>
      </div>
    </>
  )
}

export default ChatSectionAvatar;

