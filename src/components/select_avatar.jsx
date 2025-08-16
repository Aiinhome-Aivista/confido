import React, { useEffect, useState } from "react";
import ravi from "../assets/2D/ravi.svg";
import hema from "../assets/2D/hema.svg";
import subho from "../assets/2D/subho.svg";
import sita from "../assets/2D/sita.svg";
import Login from "./login";
import { RaviExperience } from "../features/characters/ravi/raviExperience";
import { SitaExperience } from "../features/characters/sita/sitaExperience";
import { SubhoExperience } from "../features/characters/subho/subhoExperience";
import { Experience } from "../features/characters/hema/experience";

const avatars = [
  { name: "Ravi", img: ravi , avatar: <RaviExperience/> },
  { name: "Hema", img: hema,  avatar: <Experience/> },
  { name: "Subho", img: subho,  avatar:  <SubhoExperience/>},
  { name: "Sita", img: sita , avatar:  <SitaExperience/>},
];

export default function ChooseAvatar() {
  const [loadChatscreen, setLoadChatscreen] = useState("avatar");

  const handleSelect = (avatar) => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const storedEmail = storedUser.email || "";
    const storedName = storedUser.name || "";
    if (storedEmail && storedName) {
      setLoadChatscreen("chatscreen")
    } else {
      setLoadChatscreen("login")
    }
  };

  if (loadChatscreen === "login") {
    return <Login />;
  }

  if (loadChatscreen === "chatscreen") {
    return <ChatScreen />;
  }

 

  return (

    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
        Choose your avatar
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar, index) => (
          <div
            key={avatar.name}
            onClick={() => handleSelect(avatar)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
             {avatar.avatar}       
              </div>
            <p className="mt-3 text-base font-bold nunito text-gray-700 group-hover:text-green-600">
              {avatar.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
