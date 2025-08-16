import React, { useState } from "react";
import ravi from "../assets/2D/ravi.svg";
import hema from "../assets/2D/hema.svg";
import subho from "../assets/2D/subho.svg";
import sita from "../assets/2D/sita.svg";
import Login from "./login";
import ChatScreen from "../features/screens/ChatScreen";
import { apiService } from "../Service/apiService";
import { POST_url } from "../connection/connection ";

const avatars = [
  { id: "101", name: "Ravi", img: ravi },
  { id: "102", name: "Hema", img: hema },
  { id: "103", name: "Subho", img: subho },
  { id: "104", name: "Sita", img: sita },
];

export default function ChooseAvatar() {
  const [loadChatscreen, setLoadChatscreen] = useState("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSelect = async (avatar) => {
    setSelectedAvatar(avatar);
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const storedEmail = storedUser.email || "";
    const storedName = storedUser.name || "";

    if (storedEmail && storedName) {
      await createSession(storedUser, avatar);
      setLoadChatscreen("chatscreen");
    } else {
      // Not logged in → go to login
      setLoadChatscreen("login");
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

  if (loadChatscreen === "login") {
    return <Login avatar={selectedAvatar} onLoginSuccess={createSession} />;
  }

  if (loadChatscreen === "chatscreen") {
    return <ChatScreen />;
  }

  return (

    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 ">
        Choose your avatar
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => handleSelect(avatar)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
              <img
                src={avatar.img}
                alt={avatar.name}
                className="w-full h-full object-cover scale-[2] translate-y-20"
              />
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
