import React, { useState, useContext } from "react";
import warningicon from "../../assets/icons/warning.svg";
import "./modal.css";
import { SubhoExperience } from "../../features/characters/subho/subhoExperience.jsx";
import { Experience } from "../../features/characters/hema/experience.jsx";
import { SitaExperience } from "../../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../../features/characters/ravi/raviExperience.jsx";
import { AuthContext } from "../../common/helper/AuthContext.jsx";
export default function SessionExpiredModal() {
  const { selectedAvatar, selectedColor, selectedHoverColor, secondaryColor, hoverSecondaryColor, charBackgroundColor, showSubscriptionModal, setShowSubscriptionModal, setShowSessionExpiredModal } = useContext(AuthContext);
  const [isLeaveBtnHovered, setIsLeaveBtnHovered] = useState(false);
  const [isPlanBtnHovered, setIsPlanBtnHovered] = useState(false);

  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho":
        return <SubhoExperience disableWave />;
      case "Sita":
        return <SitaExperience disableWave />;
      case "Ravi":
        return <RaviExperience disableWave />;
      case "Hema":
        return <Experience disableWave />;
      default:
        return <RaviExperience disableWave />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-5 animate-fadeIn">
        {/* Main Modal Container */}
        <div className="bg-[#C4C3C4] rounded-3xl p-6 max-w-[85%] relative transform animate-slideUp"
          style={{ boxShadow: "0 16px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)" }}>
          {/* Close Button */}
          <div className="flex flex-col gap-6">
            {/* Avatar and Title */}
            <div className="flex flex-col items-center justify-center">
              <div className="transform transition-all duration-300  avatar-container w-24 h-24  rounded-full border-2 border-gray-400 overflow-hidden shadow-md">
                {renderAvatar()}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div>
                <img src={warningicon} alt="Old Woman" className="w-16 h-16" />
              </div>
              <p className="text-lg font-bold text-black">
                Your session is expired
              </p>
              <p className="text-lg font-normal text-black">
                For uninterrupted session please choose your plan
              </p>
            </div>

            <div>
              <button
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-102 cursor-pointer mb-2"
                style={{
                  backgroundColor: isLeaveBtnHovered ? hoverSecondaryColor : secondaryColor,
                  color: isLeaveBtnHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.7)"
                }}
                onMouseEnter={() => setIsLeaveBtnHovered(true)}
                onMouseLeave={() => setIsLeaveBtnHovered(false)}
                onClick={() => setShowSessionExpiredModal(false)}
              >
                Leave this room
              </button>
              <button
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-102 cursor-pointer text-white"
                style={{
                  backgroundColor: isPlanBtnHovered ? selectedHoverColor : selectedColor,
                  color: isLeaveBtnHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.9)"
                }}
                onMouseEnter={() => setIsPlanBtnHovered(true)}
                onMouseLeave={() => setIsPlanBtnHovered(false)}
                onClick={() => { setShowSubscriptionModal(true), setShowSessionExpiredModal(false) }}
              >
                Choose Your Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
