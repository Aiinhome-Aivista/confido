import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../common/helper/AuthContext.jsx";
import ravi from "../assets/2D/ravi.svg";
import hema from "../assets/2D/hema.svg";
import subho from "../assets/2D/subho.svg";
import sita from "../assets/2D/sita.svg";
import ChatScreen from "../features/screens/ChatScreen.jsx";
import { apiService } from "../Service/apiService";
// ⚠️ ensure there is NO trailing space in this import path
import { POST_url } from "../connection/connection .jsx";
import { RaviExperience } from "../features/characters/ravi/raviExperience";
import { SitaExperience } from "../features/characters/sita/sitaExperience";
import { SubhoExperience } from "../features/characters/subho/subhoExperience";
import { Experience } from "../features/characters/hema/experience";
// voiceUtils not required here; hover audio is handled via setAvatarSpeech
import { setChatSession } from "../data/data.jsx";

const avatars = [
  { id: 1, name: "Ravi",  img: ravi,  avatar: <RaviExperience />,  color: "rgba(149, 182, 137, 1)" },
  { id: 2, name: "Hema",  img: hema,  avatar: <Experience />,      color: "rgba(150, 169, 184, 1)" },
  { id: 3, name: "Subho", img: subho, avatar: <SubhoExperience />, color: "rgba(76, 73, 82, 1)" },
  { id: 4, name: "Sita",  img: sita,  avatar: <SitaExperience />,  color: "rgba(149, 87, 101, 1)" },
];

const avatarId = [
  { id: "1", name: "Ravi" },
  { id: "2", name: "Hema" },
  { id: "3", name: "Subho" },
  { id: "4", name: "Sita" },
];

export default function ChooseAvatar() {
  const [loadChatscreen, setLoadChatscreen] = useState("avatar");

  const {
    setSelectedAvatar,
    setAvatarSpeech,
    setOpenLoginModal,
    setSessionTerminated,
    setHoverAvatar,
    setSelectedColor,
    setSelectedAvatarId,
  } = useContext(AuthContext);

  // Refs to control hover audio lifecycle
  const hoverTimeoutRef = useRef(null);
  const clickedRef = useRef(false); // lock to prevent hover play once user clicks

  // Helper: clear any scheduled hover actions and stop lipsync/audio in character components
  const stopHoverPlayback = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Tells character components to stop audio + lipsync immediately
    try {
      setAvatarSpeech(null);
    } catch {}
    setHoverAvatar(null);
  };

  const handleSelect = async (avatar) => {
    // Block hover-triggered playback from firing during/after click
    clickedRef.current = true;

    // Stop any in-progress hover audio/lipsync instantly
    stopHoverPlayback();

    // Persist chosen avatar theme/state
    setSelectedAvatarId(avatar.id);
    setSelectedAvatar(avatar.name);
    setSelectedColor(avatar.color);

    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const storedEmail = storedUser.email || "";
    const storedName = storedUser.name || "";

    setSessionTerminated(false);

    if (storedEmail && storedName) {
      await createSession(storedUser, avatar);
      setLoadChatscreen("chatscreen");
      // component will unmount; no need to reset clickedRef here
    } else {
      setOpenLoginModal(true);
      // If modal keeps us on the page, allow hovers again *after* a tick
      setTimeout(() => { clickedRef.current = false; }, 0);
    }
  };

  const handleAvatarHover = (avatarName) => {
    // If a click is in progress, suppress hover playback entirely
    if (clickedRef.current) return;

    // cancel any pending playback then set hover state
    stopHoverPlayback();
    setHoverAvatar(avatarName);

    // (Optional) small debounce if you want—keeps it snappy without double-firing
    hoverTimeoutRef.current = setTimeout(() => {
      if (clickedRef.current) return; // re-check lock just in case
      // Trigger the character component to load+play greeting with lipsync
      const lower = avatarName.toLowerCase();
      const audio_url = `/characters/${lower}/audio/greeting.mp3`;
      const lipsync_url = `/characters/${lower}/audio/greeting.json`;
      try {
        setAvatarSpeech({ avatarName, audio_url, lipsync_url });
      } catch {}
    }, 60); // tweak if needed
  };

  const handleAvatarLeave = () => {
    stopHoverPlayback();
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopHoverPlayback();
    };
  }, []);

  const createSession = async (user, avatar) => {
    try {
      const language = JSON.parse(sessionStorage.getItem("selectedLanguage") || "null");
      const sessionId = Math.floor(Math.random() * 1_000_000);
      const matchedAvatar = avatarId.find((a) => a.name === avatar.name);

      const data = await apiService({
        url: POST_url.session,
        method: "POST",
        data: {
          avatarName: avatar.name,
          userName: user.name,
          userId: user.user_id,
          avatarId: matchedAvatar?.id,
          languageId: language?.id,
          sessionId,
        },
      });

      if (data) {
        console.log("Session Created:", data);
        sessionStorage.setItem("session", JSON.stringify(data));

        // Store a plain sessionId string for quick reads
        const sid = data.data?.session_id || data.data?.sessionId || sessionId;
        sessionStorage.setItem("sessionId", String(sid));

        // First AI message (dynamic) to seed chat
        if (data.data?.message) {
          setChatSession([
            {
              role: "ai",
              message: data.data.message,
              time: new Date().toLocaleTimeString(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Session API Failed:", error);
    }
  };

  if (loadChatscreen === "chatscreen") {
    return <ChatScreen onLoginSuccess={createSession} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center pb-[calc(22vh)]">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Choose your avatar</h1>

      <p className="font-nunito text-gray-600 text-center max-w-2xl mb-8 leading-relaxed">
        Select an avatar that best represents your style. Each avatar adds a
        unique <br />
        personality to your sessions — choose one now and start chatting with
        confidence.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => handleSelect(avatar)}
            onMouseEnter={() => handleAvatarHover(avatar.name)}
            onMouseLeave={handleAvatarLeave}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-xl">
              {avatar.avatar}
            </div>
            <p className="mt-3 text-base font-bold nunito transition-colors duration-300 group-hover:text-green-600">
              {avatar.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
