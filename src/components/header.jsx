import React from "react";
import logoSrc from "../assets/icons/confido_logo.svg";
import languageIcon from "../assets/icons/language_icon.svg";
import settingsIcon from "../assets/icons/settings_icon.svg";
import signinIcon from "../assets/icons/signin_icon.svg";

export default function Header({
  logoSrc: logoOverride,
  icons: iconsOverride,
  className = "",
}) {
  const logo = logoOverride || logoSrc;

  const defaultIcons = [
    { src: languageIcon, alt: "Language", onClick: () => console.log("Language clicked") },
    { src: settingsIcon, alt: "Settings", onClick: () => console.log("Settings clicked") },
    { src: signinIcon, alt: "Sign in", onClick: () => console.log("Sign in clicked") },
  ];

  const icons = iconsOverride || defaultIcons;

  return (
    <header
      className={`w-full backdrop-blur-sm drop-shadow-sm ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Confido"
            className="h-10 md:h-12 object-contain"
            draggable="false"
          />
        </div>

        {/* Right: Icon buttons */}
        <div className="flex items-center gap-3">
          {icons.map((ic, idx) => (
            <button
              key={idx}
              type="button"
              onClick={ic.onClick}
              aria-label={ic.alt || `icon-${idx}`}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              <img src={ic.src} alt={ic.alt} className="w-6 h-6" draggable="false" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
