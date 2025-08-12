import React from "react";

const avatars = [
  { name: "Ravi", img: "/assets/2D/ravi.svg" },
  { name: "Hema", img: "/assets/2D/hema.svg" },
  { name: "Subho", img: "/assets/2D/subho.svg" },
  { name: "Sita", img: "/assets/2D/sita.svg" },
];

export default function ChooseAvatar({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
        Choose your avatar
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.name}
            onClick={() => onSelect && onSelect(avatar.name)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
              <img
                src={avatar.img}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-lg font-medium text-gray-700 group-hover:text-green-600">
              {avatar.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
