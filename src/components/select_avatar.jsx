import React, { useEffect, useState } from "react";
import ravi from "../assets/2D/ravi.svg";
import hema from "../assets/2D/hema.svg";
import subho from "../assets/2D/subho.svg";
import sita from "../assets/2D/sita.svg";
import Login from "./login";

const avatars = [
  { name: "Ravi", img: ravi },
  { name: "Hema", img: hema },
  { name: "Subho", img: subho },
  { name: "Sita", img: sita },
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

    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
        Choose your avatar
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.name}
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
            <p className="mt-3 text-base font-bold nunito text-gray-700 group-hover:text-green-600">
              {avatar.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
