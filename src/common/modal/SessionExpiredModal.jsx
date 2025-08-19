import React from "react";
import oldWoman from "../../assets/2D/old woman.svg";
import warningicon from "../../assets/icons/warning.svg";
import "./modal.css";

export default function SessionExpiredModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-fadeIn">
      {/* Main Modal Container */}
      <div className="bg-[#C4C3C4] rounded-3xl p-6 max-w-[85%] relative transform animate-slideUp">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="w-4 h-4 rounded-full bg-[#FF6B6B] hover:bg-red-600 transition-all duration-200 hover:scale-110"
          ></button>
        </div>
        <div className="flex flex-col gap-6">
          {/* Avatar and Title */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-3 transform transition-all duration-300">
              <img
                src={oldWoman}
                alt="Old Woman"
                className="w-16 h-16 rounded-full border-2 border-transparent animate-bounce-subtle"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div>
              <img src={warningicon} alt="Old Woman" className="w-16 h-16" />
            </div>
            <p className="text-lg font-bold text-black">
              {" "}
              Your session is expired
            </p>
            <p className="text-lg font-normal text-black">
              {" "}
              For uninterapt session please choose your plan
            </p>
          </div>
          <div>
            <button
              className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-105 bg-[#7E4A5780] text-white hover:bg-[#7A4D5E] mb-2`}
            >
              Leave this room
            </button>
            <button
              className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-105 bg-[#8B5A6B] text-white hover:bg-[#7A4D5E]`}
            >
              Choose Your Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
