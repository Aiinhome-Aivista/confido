
import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import "./header.css";
import logoSrc from "../assets/icons/confido_logo.svg";
import languageIcon from "../assets/icons/language_icon.svg";
import settingsIcon from "../assets/icons/settings_icon.svg";
import signinIcon from "../assets/icons/signin_icon.svg";
import { POST_url } from "../connection/connection ";
import { apiService } from "../Service/apiService";

import { GET_url } from "../connection/connection .jsx";

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [languages, setLanguages] = useState([]);
  const leaveTimer = useRef(null);
  const navigate = useNavigate();

  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const storedName = storedUser.name || "";
  const storedEmail = storedUser.email || "";

  // Fetch languages on mount
  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await apiService({
        url: GET_url.languages,
        method: "GET",
      });

      if (!res.error && res.status && Array.isArray(res.data)) {
        setLanguages(res.data.map(lang => lang.language_name));
      }
    };

    fetchLanguages();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await apiService({
        url: POST_url.logout,
        method: "POST",
        data: {
          email: storedEmail,
          is_logged_in: "false",
        },
      });

      if (res?.error) {
        throw new Error(res.message || "Logout failed");
      }

      // Clear session and refresh
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    }
  };

  // Login handler
  const handleLoginClick = () => {
    if (!storedEmail || !storedName) {
      navigate("/login");
    }
  };

  const icons = [
    {
      id: "language",
      title: "Language",
      icon: languageIcon,
      options: languages,
    },
    {
      id: "settings",
      title: "Settings",
      icon: settingsIcon,
      options: ["Audio Off", "Audio On"],
    },
    {
      id: "login",
      title: storedName ? storedName : "Login",
      icon: signinIcon,
      options: [],
    },
  ];

  const handleEnter = (id) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(id);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(null), 120);
  };


  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logoSrc} alt="Logo" className="logo" />
        </div>

        <div className="icon-wrapper">
          {icons.map((item) => {
            const expanded = hovered === item.id;
            return (
              <div
                key={item.id}
                className={`icon-box ${expanded ? "expanded" : ""}`}
                onMouseEnter={() => handleEnter(item.id)}
                onMouseLeave={handleLeave}
                onClick={item.id === "login" ? handleLoginClick : undefined}
              >
                <img src={item.icon} alt={item.title} className="icon-badge" />
                <div className="icon-body">
                  <div className="icon-title">{item.title}</div>
                  {item.id === "login" && storedName && (
                    <div
                      className="icon-option text-red-600 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  )}

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
              </div>
            );
          })}
        </div>
      </header>

      <div className="header-spacer" />
    </>
  );
}
