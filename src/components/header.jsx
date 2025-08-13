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
    {
      src: languageIcon,
      alt: "Language",
      title: "Language",
      dropdown: ["English", "Bengali", "Hindi"],
    },
       {
      src: settingsIcon,
      alt: "Settings",
      title: "Settings",
      dropdown: ["Audio Off", "Audio On"],
    },
    {
      src: signinIcon,
      alt: "Sign in",
      title: "Login",
      dropdown: [],
      onClick: () => console.log("Sign in clicked"),
    },
  ];

  const icons = iconsOverride || defaultIcons;

  return (
    <header
      className={`w-full bg-white fixed top-0 left-0 right-0 z-50 ${className}`}
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
            <div key={idx} className="relative group">
              <button
                type="button"
                onClick={ic.onClick}
                aria-label={ic.alt || `icon-${idx}`}
                className="flex items-center justify-center w-10 h-10 rounded-full shadow focus:outline-none transition"
                style={{ backgroundColor: "rgba(30,30,30,0.07)" }}
              >
                <img
                  src={ic.src}
                  alt={ic.alt}
                  className="w-5 h-5 object-contain"
                  draggable="false"
                />
              </button>

              {/* Dropdown menu with header */}
              {ic.dropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  {/* Dropdown title */}
                  <div
                    className="px-4 py-2 border-b border-gray-200"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 500,       
                      fontSize: "18px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                      color: "rgba(30, 30, 30, 1)", 
                    }}
                  >
                    {ic.title}
                  </div>


                  {/* Dropdown options with Nunito styling */}
                  {ic.dropdown.map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        color: "rgba(30, 30, 30, 1)",
                      }}
                    >
                      {item}
                    </div>
                  ))}

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
