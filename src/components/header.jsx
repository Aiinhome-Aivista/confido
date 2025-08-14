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
      <style>
        {`
          @keyframes expandIcon {
            0% {
              width: 40px;
              height: 40px;
              border-radius: 9999px;
              padding: 0;
            }
            100% {
              width: 170px;
              height: auto;
              border-radius: 12px;
              padding: 8px 12px;
            }
          }
          @keyframes collapseIcon {
            0% {
              width: 170px;
              height: auto;
              border-radius: 12px;
              padding: 8px 12px;
            }
            100% {
              width: 40px;
              height: 40px;
              border-radius: 9999px;
              padding: 0;
            }
          }
        `}
      </style>

      <header className="fixed top-0 left-0 right-0 z-[999] flex justify-between items-start px-5 py-2 bg-transparent">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoSrc} alt="Logo" className="h-10" />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {icons.map((item) => {
            const isHovered = hovered === item.id;
            return (
              <div
                key={item.id}
                className={`relative overflow-hidden bg-[rgba(30,30,30,0.07)] flex-shrink-0
                  ${isHovered ? "shadow-lg" : ""}
                  ${
                    isHovered
                      ? "animate-[expandIcon_0.25s_cubic-bezier(.2,.9,.2,1)_forwards]"
                      : "animate-[collapseIcon_0.25s_cubic-bezier(.2,.9,.2,1)_forwards]"
                  }
                `}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHovered ? (
                  // Expanded content: aligned title & options
                  <>
                    <div className="flex flex-col w-full pr-9">
                      <div className="font-nunito text-[16px] font-medium mb-1 text-[rgba(30,30,30,1)] whitespace-nowrap text-left">
                        {item.title}
                      </div>
                      {item.options.length > 0 && (
                        <div className="flex flex-col gap-1 text-left">
                          {item.options.map((opt, i) => (
                            <div
                              key={i}
                              className="font-nunito text-sm font-normal text-[rgba(30,30,30,1)] cursor-pointer px-0 py-1 rounded-md hover:bg-black/5"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-5 h-5 absolute top-2 right-2 pointer-events-none"
                    />
                  </>
                ) : (
                  // Collapsed content: centered icon
                  <div className="flex items-center justify-center w-10 h-10">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-5 h-5 pointer-events-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </header>

      <div className="h-[60px]" aria-hidden="true" />
    </>
  );
}
