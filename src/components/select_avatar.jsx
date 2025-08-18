import React, { useEffect, useState, useContext } from "react";
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

const avatars = [
  { name: "Ravi", img: ravi, avatar: <RaviExperience /> },
  { name: "Hema", img: hema, avatar: <Experience /> },
  { name: "Subho", img: subho, avatar: <SubhoExperience /> },
  { name: "Sita", img: sita, avatar: <SitaExperience /> },



];

export default function ChooseAvatar() {
  const [loadChatscreen, setLoadChatscreen] = useState("avatar");
  const { setOpenLoginModal, setSelectedAvatar } = useContext(AuthContext);

  const handleSelect = async (avatar) => {
    setSelectedAvatar(avatar.name);
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const storedEmail = storedUser.email || "";
    const storedName = storedUser.name || "";

    if (storedEmail && storedName) {
      await createSession(storedUser, avatar);
      setLoadChatscreen("chatscreen");
    } else {
      // Not logged in → go to login
      setOpenLoginModal(true);
    }
  };

  const createSession = async (user, avatar) => {
    try {
      const data = await apiService({
        url: POST_url.session,
        method: "POST",
        data: {
          avatarName: avatar.name,
          userName: user.name,
          userId: user.user_id,
          avatarId: avatar.id,
          languageId: "2",
          sessionId: "1",
        },
      });

      if (data) {
        console.log("Session Created:", data);
        sessionStorage.setItem("session", JSON.stringify(data));
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar, index) => (
          <div
            key={avatar.id}
            onClick={() => handleSelect(avatar)}
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
