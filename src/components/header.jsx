import React, { useState } from "react";
import "./header.css";
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
      <header className="header">
        {/* Logo */}
        <div className="logo-container">
          <img src={logoSrc} alt="Logo" className="logo" />
        </div>

        {/* Right icons */}
        <div className="icon-wrapper">
          {icons.map((item) => {
            const isHovered = hovered === item.id;
            return (
              // <div
              //   key={item.id}
              //   className={`icon-box ${isHovered ? "expanded" : "collapsed"}`}
              //   onMouseEnter={() => setHovered(item.id)}
              //   onMouseLeave={() => setHovered(null)}
              // >
              <div
                key={item.id}
                className={`icon-box ${isHovered ? "expanded" : ""}`}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHovered ? (
                  <>
                    <div className="icon-content">
                      <div className="icon-title">{item.title}</div>
                      {item.options.length > 0 && (
                        <div className="icon-options">
                          {item.options.map((opt, i) => (
                            <div key={i} className="icon-option">
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="icon-img-topright"
                    />
                  </>
                ) : (
                  <div className="icon-centered">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="icon-img"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </header>
      <div className="header-spacer" />
    </>
  );
}
