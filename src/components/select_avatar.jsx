import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../common/helper/AuthContext.jsx";
import ravi from "../assets/2D/ravi.svg";
import hema from "../assets/2D/hema.svg";
import subho from "../assets/2D/subho.svg";
import sita from "../assets/2D/sita.svg";
import ChatScreen from "../features/screens/ChatScreen.jsx";
import { apiService } from "../Service/apiService";
import { POST_url } from "../connection/connection ";
import { RaviExperience } from "../features/characters/ravi/raviExperience";
import { SitaExperience } from "../features/characters/sita/sitaExperience";
import { SubhoExperience } from "../features/characters/subho/subhoExperience";
import { Experience } from "../features/characters/hema/experience";
import {
  playWelcomeWithDelay,
  cancelWelcomeMessage
} from "../utils/voiceUtils.js";
import { chatSession, setChatSession } from "../data/data.jsx";

const avatars = [
  {
    id: 1,
    name: "Ravi",
    img: ravi,
    avatar: <RaviExperience />,
    color: "rgba(149, 182, 137, 0.8)",
    secondaryColor: "rgba(149, 182, 137, 0.4)",
    hoverColor: "rgba(149, 182, 137, 1)",
    hoverSecondaryColor: "rgba(149, 182, 137, 0.6)",
    background: "rgba(149, 182, 137, 0.07)"
  },
  {
    id: 2,
    name: "Hema",
    img: hema,
    avatar: <Experience />,
    color: "rgba(150, 169, 184, 0.8)",
    secondaryColor: "rgba(150, 169, 184, 0.4)",
    hoverColor: "rgba(150, 169, 184, 1)",
    hoverSecondaryColor: "rgba(150, 169, 184, 0.6)",
    background: "rgba(150, 169, 184, 0.07)",

  },
  {
    id: 3,
    name: "Subho",
    img: subho,
    avatar: <SubhoExperience />,
    color: "rgba(76, 73, 82, 0.8)",
    secondaryColor: "rgba(76, 73, 82, 0.4)",
    hoverColor: "rgba(76, 73, 82, 1)",
    hoverSecondaryColor: "rgba(76, 73, 82, 0.6)",
    background: "rgba(76, 73, 82, 0.07)",
  },
  {
    id: 4,
    name: "Sita",
    img: sita,
    avatar: <SitaExperience />,
    color: "rgba(149, 87, 101, 0.8)",
    secondaryColor: "rgba(149, 87, 101, 0.4)",
    hoverColor: "rgba(149, 87, 101, 1)",
    hoverSecondaryColor: "rgba(149, 87, 101, 0.6)",
    background: "rgba(149, 87, 101, 0.07)",
  },
];

const avatarId = [
  { id: "1", name: "Ravi" },
  { id: "2", name: "Hema" },
  { id: "3", name: "Subho" },
  { id: "4", name: "Sita" },
]

export default function ChooseAvatar() {
  const [loadChatscreen, setLoadChatscreen] = useState("avatar");
  const { setSelectedAvatar, setAvatarSpeech, setOpenLoginModal, setSessionTerminated, setHoverAvatar, setSelectedColor, setSelectedAvatarId, setSelectedHoverColor, setSecondaryColor, setHoverSecondaryColor, setCharBackgroundColor,
  } = useContext(AuthContext);
  const hoverTimeoutRef = useRef(null);

  const handleSelect = async (avatar) => {
    setSelectedAvatarId(avatar.id)
    setSelectedAvatar(avatar.name);
    setSelectedColor(avatar.color);
    setSelectedHoverColor(avatar.hoverColor);
    setSecondaryColor(avatar.secondaryColor);
    setHoverSecondaryColor(avatar.hoverSecondaryColor);
    setCharBackgroundColor(avatar.background);

    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const storedEmail = storedUser.email || "";
    const storedName = storedUser.name || "";

    setSessionTerminated(false);

    if (storedEmail && storedName) {
      await createSession(storedUser, avatar);
      setLoadChatscreen("chatscreen");
    } else {
      // Not logged in → go to login
      setOpenLoginModal(true);
    }
  };

  const handleAvatarHover = (avatarName) => {
    // Cancel any existing timeout

    setHoverAvatar(avatarName);

  };

  const handleAvatarLeave = () => {
    // Cancel the pending voice when mouse leaves

    hoverTimeoutRef.current = null;
  };

  const createSession = async (user, avatar) => {
    try {
      const language = JSON.parse(sessionStorage.getItem("selectedLanguage"));
      const sessionId = Math.floor(Math.random() * 1000000);
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
          sessionId: sessionId,
        },
      });

      if (data) {
        console.log("Session Created:", data);
        sessionStorage.setItem("session", JSON.stringify(data));

        // ✅ Save only sessionId separately
        if (data.data?.session_id || data.data?.sessionId) {
          const sid = data.data.session_id || data.data.sessionId;
          sessionStorage.setItem("sessionId", sid);
        } else {
          sessionStorage.setItem("sessionId", sessionId); // fallback to generated
        }

        // Store dynamic first AI message globally
        setChatSession([
          {
            role: "ai",
            message: data.data.message,
            time: new Date().toLocaleTimeString(),
          },
        ]);
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
      <h1 className="text-2xl md:text-3xl font-bold mb-8 ">
        Choose your avatar
      </h1>
      <p className="font-nunito text-gray-600 text-center max-w-2xl mb-8 leading-relaxed">
        Select an avatar that best represents your style. Each avatar adds a unique <br />personality to your sessions — choose one now and start chatting with confidence.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            onClick={() => handleSelect(avatar)}
            onMouseEnter={() => handleAvatarHover(avatar.name)}
            onMouseLeave={handleAvatarLeave}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
              {avatar.avatar}
            </div>
            <p className="mt-3 text-base font-bold nunito group-hover:text-green-600">
              {avatar.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
