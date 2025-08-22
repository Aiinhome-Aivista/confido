import React, { useEffect, useRef } from 'react';
import ChatSectionAvatar from './Component/ChatSectionAvatar';
import ChatSectionText from './Component/ChatSectionText';
import { useContext } from 'react';
import { AuthContext } from '../../common/helper/AuthContext.jsx';
import ChooseAvatar from '../../components/select_avatar.jsx';

function ChatScreen() {
  const { sessionTerminated, selectedAvatar, setAvatarSpeech, isSpeakerOn } = useContext(AuthContext);
  const greetedRef = useRef(false);

  useEffect(() => {
    // Play chat greeting once when ChatScreen first mounts for the selected avatar
    if (sessionTerminated) return;
    if (greetedRef.current) return;
    greetedRef.current = true;

    // small delay to allow avatar experience to mount
    const t = setTimeout(() => {
      if (!isSpeakerOn) return;
      try {
        const avatarName = selectedAvatar || 'Ravi';
        const audio_url = `/characters/${avatarName.toLowerCase()}/audio/chatGreeting.mp3`;
        const lipsync_url = `/characters/${avatarName.toLowerCase()}/audio/chatGreeting.json`;
        setAvatarSpeech({ avatarName, audio_url, lipsync_url });
      } catch (e) {
        console.log(e);
      }
    }, 200);

    return () => clearTimeout(t);
  }, [sessionTerminated, selectedAvatar, setAvatarSpeech, isSpeakerOn]);

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