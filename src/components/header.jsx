
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
import { useContext } from "react";
import { AuthContext } from "../common/helper/AuthContext.jsx";
import TerminateModal from "../features/terminateModal.jsx";

import SubscriptionModal from "../common/modal/SubscriptionModal";
import SessionExpiredModal from "../common/modal/SessionExpiredModal";

import SpeakerOn from '../assets/icons/volume_up.svg';
import SpeakerOff from '../assets/icons/volume_off.svg';


export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [languages, setLanguages] = useState([]);
  const leaveTimer = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const storedName = storedUser.name || "";
  const storedEmail = storedUser.email || "";
  const { setOpenLoginModal } = useContext(AuthContext);
  const { setIsLogin } = useContext(AuthContext);
  const [selectedLanguage, setSelectedLanguage] = useState(sessionStorage.getItem("selectedLanguage") || "");

  const sessionId = sessionStorage.getItem("sessionId");

  const { isSpeakerOn, setIsSpeakerOn, isLoggedIn } = useContext(AuthContext);
  const audioObjectsRef = useRef([]);
  const isSpeakerOnRef = useRef(isSpeakerOn);


  //  Intercept Audio constructor
  useEffect(() => {
    const OriginalAudio = window.Audio;
    window.Audio = function (...args) {
      const audio = new OriginalAudio(...args);

      // Always apply latest mute state
      audio.muted = !isSpeakerOnRef.current;

      audioObjectsRef.current.push(audio);
      return audio;
    };

    return () => {
      // cleanup: restore original Audio
      window.Audio = OriginalAudio;
      audioObjectsRef.current.forEach(a => a.pause());
      audioObjectsRef.current = [];
    };
  }, []);

  //  When toggle changes, update ref + mute all existing audios
  useEffect(() => {
    isSpeakerOnRef.current = isSpeakerOn; // keep latest state
    audioObjectsRef.current.forEach((a) => {
      a.muted = !isSpeakerOn;
    });
  }, [isSpeakerOn]);

  const handleToggle = () => {
    setIsSpeakerOn((prev) => !prev);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await apiService({
        url: GET_url.languages,
        method: "GET",
      });

      if (!res.error && res.status && Array.isArray(res.data)) {
        const langs = res.data.map((lang) => ({
          id: lang.language_id,
          name: lang.language_name,
        }));

        setLanguages(langs);

        // 🔹 if nothing stored, default to first (English)
        if (!sessionStorage.getItem("selectedLanguage") && langs.length > 0) {
          setSelectedLanguage(langs[0]);
          sessionStorage.setItem("selectedLanguage", JSON.stringify(langs[0]));
        }
      }
    };

    fetchLanguages();
  }, []);


  // 🔹 Restore saved language on mount
  useEffect(() => {
    const savedLang = sessionStorage.getItem("selectedLanguage");
    if (savedLang) {
      setSelectedLanguage(JSON.parse(savedLang));
    }
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
    setOpenLoginModal(true);
  };


  const allIcons = [
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

  // ✅ Apply filter condition only while rendering
  const icons = allIcons.filter((icon) => {
    if (isLoggedIn) {
      return icon.id !== "language" && icon.id !== "settings";
    }
    return true;
  });

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
        <div className="logo-container cursor-pointer" onClick={() => setShowSubscriptionModal(true)} >
          <img src={logoSrc} alt="Logo" className="logo" />
        </div>
        <div className="flex">
          <div className="terminateIconBg px-3">
            {isLoggedIn && <div onClick={() => setShowModal(true)} className="relative bg-[#76DE48] px-[0.5rem] py-[0.5rem] rounded-full cursor-pointer">
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-green-400 opacity-75 animate-pulse-ring z-0" />
            </div>}
          </div>

          {isLoggedIn && (
            <div
              onClick={handleToggle}
              className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition
                    "
            >
              <img
                src={isSpeakerOn ? SpeakerOn : SpeakerOff}
                alt={isSpeakerOn ? "Speaker On" : "Speaker Off"}
              />
            </div>
          )}


          <div className="icon-wrapper">
            {icons.map((item) => {
              const expanded = hovered === item.id;
              return (
                <div
                  key={item.id}
                  className={`icon-box ${expanded ? "expanded" : ""}`}
                  onMouseEnter={() => handleEnter(item.id)}
                  onMouseLeave={handleLeave}
                >
                  <img src={item.icon} alt={item.title} className="icon-badge" />
                  <div className="icon-body">
                    <div className="icon-title cursor-pointer" onClick={handleLoginClick}>{item.title}</div>
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
                        {item.options.map((opt, i) => {
                          const isSelected =
                            item.id === "language" &&
                            selectedLanguage &&
                            (selectedLanguage.id === opt.id || selectedLanguage.name === opt.name);

                          return (
                            <div
                              key={i}
                              className="icon-option flex justify-between items-center cursor-pointer"
                              onClick={() => {
                                if (item.id === "language") {
                                  setSelectedLanguage(opt);
                                  sessionStorage.setItem("selectedLanguage", JSON.stringify(opt));
                                }
                              }}
                            >
                              {/* Language Name */}
                              <span>{typeof opt === "string" ? opt : opt.name}</span>

                              {/* Show Tick if selected */}
                              {isSelected && (
                                <span className="text-black-600 ml-auto">✔</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}


                  </div>
                </div>

              );
            })}

          </div>
        </div>


        {showModal && (
          <TerminateModal
            onClose={() => setShowModal(false)}
          // onConfirm={handleTerminate}
          />
        )}
      </header >

      <div className="header-spacer" />


    </>
  );
}
