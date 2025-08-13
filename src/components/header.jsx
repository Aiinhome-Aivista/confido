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
      className={`w-full bg-transparent ${className}`}
      role="banner"
    >
      <div className="flex items-center justify-between w-full px-4 py-4">
        {/* Left: Logo */}
        <img
          src={logo}
          alt="Confido"
          className="h-8 object-contain"
          draggable="false"
        />

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          {icons.map((ic, idx) => (
            <button
              key={idx}
              type="button"
              onClick={ic.onClick}
              aria-label={ic.alt || `icon-${idx}`}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow hover:bg-gray-100 focus:outline-none transition"
            >
              <img
                src={ic.src}
                alt={ic.alt}
                className="w-5 h-5 object-contain"
                draggable="false"
              />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
