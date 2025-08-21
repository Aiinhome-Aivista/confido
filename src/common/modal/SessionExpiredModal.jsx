import React, { useState, useContext } from "react";
import warningicon from "../../assets/icons/warning.svg";
import "./modal.css";
import { SubhoExperience } from "../../features/characters/subho/subhoExperience.jsx";
import { Experience } from "../../features/characters/hema/experience.jsx";
import { SitaExperience } from "../../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../../features/characters/ravi/raviExperience.jsx";
import { AuthContext } from "../../common/helper/AuthContext.jsx";
import SubscriptionModal from '../../common/modal/SubscriptionModal.jsx';
export default function SessionExpiredModal() {
  const { selectedAvatar, selectedColor, showSubscriptionModal, setShowSubscriptionModal, setShowSessionExpiredModal } = useContext(AuthContext);

  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho":
        return <SubhoExperience />;
      case "Sita":
        return <SitaExperience />;
      case "Ravi":
        return <RaviExperience />;
      case "Hema":
        return <Experience />;
      default:
        return <RaviExperience />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-fadeIn">
        {/* Main Modal Container */}
        <div className="bg-[#C4C3C4] rounded-3xl p-6 max-w-[85%] relative transform animate-slideUp">
          {/* Close Button */}
          <div className="flex flex-col gap-6">
            {/* Avatar and Title */}
            <div className="flex flex-col items-center justify-center">
              <div className="transform transition-all duration-300  avatar-container w-25 h-25  rounded-full border-2 border-[#7E4A5712] overflow-hidden shadow-md">
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
                    duration-300 transform hover:scale-102 cursor-pointer bg-[#7E4A5780] text-white hover:bg-[#7e4a5761] mb-2"
                onClick={() => setShowSessionExpiredModal(false)}
              >
                Leave this room
              </button>
              <button
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-102 cursor-pointer bg-[#8B5A6B] text-white hover:bg-[#7A4D5E]"
                onClick={() => setShowSubscriptionModal(true)}
              >
                Choose Your Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSubscriptionModal && (
        <SubscriptionModal />
      )}
    </>
  );
}
