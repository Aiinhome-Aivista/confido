import React, { useContext,useState } from "react";
import { AuthContext } from "../common/helper/AuthContext.jsx";
import warningicon from "../assets/icons/warning.svg";
import { SubhoExperience } from "../features/characters/subho/subhoExperience.jsx";
import { Experience as HemaExperience } from "../features/characters/hema/experience.jsx";
import { SitaExperience } from "../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../features/characters/ravi/raviExperience.jsx";


const TerminateModal = ({ onClose }) => {
    const { setSessionTerminated, setIsLoggedIn, selectedAvatar} = useContext(AuthContext);

    const handleConfirm = () => {
        setIsLoggedIn(false);
        // Clear sessionId
        sessionStorage.removeItem("sessionId");
        console.log("Session cleared");
        setSessionTerminated(true);
        onClose();
    };
   const { selectedColor, selectedHoverColor, secondaryColor, hoverSecondaryColor, charBackgroundColor, showSubscriptionModal, setShowSubscriptionModal, setShowSessionExpiredModal } = useContext(AuthContext);
    const [isLeaveBtnHovered, setIsLeaveBtnHovered] = useState(false);
    const [isPlanBtnHovered, setIsPlanBtnHovered] = useState(false);

  // Render a visual avatar inside the modal but suppress its speech (audio + lipsync).
  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho":
        return <SubhoExperience disableWave suppressSpeech={true} />;
      case "Sita":
        return <SitaExperience disableWave suppressSpeech={true} />;
      case "Ravi":
        return <RaviExperience disableWave suppressSpeech={true} />;
      case "Hema":
        return <HemaExperience disableWave suppressSpeech={true} />;
      
      default:
        return <RaviExperience disableWave suppressSpeech={true} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg terminate-bg">
      <div className="loginModal rounded-2xl p-6 w-[90%] max-w-sm relative text-center backdrop-blur-lg bg-blend-overlay border border-white/20 shadow-md">
        <div className="absolute top-0 left-0 w-full h-9 ai-bg rounded-t-3xl flex items-center justify-end px-3 gap-2">
          <div
            onClick={onClose}
            data-no-sound="true"
            className="w-4 h-4 rounded-full modalCloseIcon cursor-pointer hover:scale-110 transition-transform"
            aria-label="Close"
            title="Close"
          ></div>
        </div>

        <div className="avatar-container w-20 h-20 md:w-24 md:h-24 mx-auto mt-4 mb-4 rounded-full border-2  overflow-hidden shadow-md"
        style={{ borderColor: selectedColor  }}>

          {renderAvatar()}
        </div>
        <div className="flex items-center justify-center">
          <img src={warningicon} alt="Old Woman" className="w-16 h-16" />
        </div>

        <div className="username font-semibold text-sm mb-6">
          Do you really want to
          <br />
          close the session?
        </div>

        <div>

          <button
            data-no-sound="true"
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-102 cursor-pointer text-white mb-2"
                style={{ backgroundColor: isLeaveBtnHovered ? hoverSecondaryColor : selectedColor }}
                onMouseEnter={() => setIsLeaveBtnHovered(true)}
                onMouseLeave={() => setIsLeaveBtnHovered(false)}
               onClick={handleConfirm}
              >
             Yes
              </button>
              <button
                data-no-sound="true"
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-102 cursor-pointer text-white"
                style={{ backgroundColor: isPlanBtnHovered ? hoverSecondaryColor : selectedColor }}
                onMouseEnter={() => setIsPlanBtnHovered(true)}
                onMouseLeave={() => setIsPlanBtnHovered(false)}
                onClick={onClose}
              >
                No
              </button>
        </div>
      </div>
    </div>
  );
};

export default TerminateModal;
