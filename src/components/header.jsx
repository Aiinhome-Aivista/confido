import React, { useState } from "react";
import logoSrc from "../assets/icons/confido_logo.svg";
import languageIcon from "../assets/icons/language_icon.svg";
import settingsIcon from "../assets/icons/settings_icon.svg";
import signinIcon from "../assets/icons/signin_icon.svg";

export default function Header() {
  const [hovered, setHovered] = useState(null);

  const icons = [
    {
      id: "language",
      title: "Language",
      icon: languageIcon,
      options: ["English", "Hindi", "Bengali"],
    },
    {
      id: "settings",
      title: "Settings",
      icon: settingsIcon,
      options: ["Audio Off", "Audio On"],
    },
    {
      id: "login",
      title: "Login",
      icon: signinIcon,
      options: [],
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[999] flex justify-between items-center px-5 py-2 bg-transparent">
        {/* Logo - fixed left */}
        <div className="flex items-center">
          <img src={logoSrc} alt="Logo" className="h-10" />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {icons.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden flex items-start justify-end 
                transition-all duration-100 ease-[cubic-bezier(.2,.9,.2,1)]
                ${
                  hovered === item.id
                    ? " rounded-xl min-w-[170px] h-auto px-3 py-2 shadow-lg"
                    : "bg-[rgba(30,30,30,0.07)] rounded-full w-10 h-10"
                }
                ${hovered === "settings" && item.id === "language" ? "translate-x-[-12px]" : ""}
              `}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Expanded content */}
              {hovered === item.id && (
                <div className="flex flex-col w-full pr-9">
                  <div className="font-nunito text-[16px] font-medium mb-1 text-[rgba(30,30,30,1)] whitespace-nowrap">
                    {item.title}
                  </div>
                  {item.options.length > 0 && (
                    <div className="flex flex-col gap-1">
                      {item.options.map((opt, i) => (
                        <div
                          key={i}
                          className="font-nunito text-sm font-normal text-[rgba(30,30,30,1)] cursor-pointer px-2 py-1 rounded-md hover:bg-black/5"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Icon top-right */}
              <img
                src={item.icon}
                alt={item.title}
                className="w-5 h-5 absolute top-2 right-2 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </header>

      {/* Spacer so content isn't hidden behind fixed header */}
      <div className="h-[60px]" aria-hidden="true" />
    </>
  );
}
