import React, { useState, useContext } from "react";
import { AuthContext } from "../../common/helper/AuthContext.jsx";
import { plansData } from "../../data/data.jsx";
import oldMan from "../../assets/2D/old man.svg";
import oldWoman from "../../assets/2D/old woman.svg";
import youngMan from "../../assets/2D/young man.svg";
import youngWoman from "../../assets/2D/young woman.svg";
import "./modal.css";
import { SubhoExperience } from "../../features/characters/subho/subhoExperience.jsx";
import { Experience } from "../../features/characters/hema/experience.jsx";
import { SitaExperience } from "../../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../../features/characters/ravi/raviExperience.jsx";

export default function SubscriptionModal({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([
    "Hindi",
    "Bengali",
  ]);
  const { selectedAvatar } = useContext(AuthContext);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Add a small delay for better UX
    setTimeout(() => setShowCustomization(true), 150);
  };
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

  const handleBackToPlans = () => {
    setShowCustomization(false);
    // Reset selections when going back
    setTimeout(() => setSelectedPlan(null), 300);
  };

  const toggleAvatar = (avatar) => {
    setSelectedAvatars((prev) => {
      if (prev.includes(avatar)) {
        return prev.filter((a) => a !== avatar);
      } else if (prev.length < 2) {
        return [...prev, avatar];
      }
      return prev;
    });
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((l) => l !== language);
      } else if (prev.length < 2) {
        return [...prev, language];
      }
      return prev;
    });
  };

  const getButtonStyle = (plan) => {
    if (plan.id === "free") {
      return "bg-[#2D3748] text-white";
    }
    if (plan.id === "premium" || plan.id === "pro") {
      return "bg-[#8B5A6B] text-white hover:bg-[#7A4D5E]";
    }
    return "bg-gray-600 text-white hover:bg-gray-700";
  };

  const avatars = [
    { src: oldMan, alt: "Old Man", name: "oldMan" },
    { src: oldWoman, alt: "Old Woman", name: "oldWoman" },
    { src: youngMan, alt: "Young Man", name: "youngMan" },
    { src: youngWoman, alt: "Young Woman", name: "youngWoman" },
  ];

  const languages = ["English", "Hindi", "Bengali"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-fadeIn">
      {/* Main Modal Container */}
      <div className="bg-[#C4C3C4] rounded-4xl p-6 max-w-[85%] relative transform animate-slideUp">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="w-4 h-4 rounded-full bg-[#CA4C4C] hover:bg-red-600 transition-all duration-200 hover:scale-110"
          ></button>
        </div>

        {/* Avatar and Title */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="transform transition-all duration-300  avatar-container w-24 h-24  rounded-full border-2 border-[#7E4A5712] overflow-hidden shadow-md">
            {renderAvatar()}
          </div>
          <h2 className="text-lg font-bold text-black animate-fadeInUp">
            {showCustomization ? "Customize Your Plan" : "Choose your plan"}
          </h2>
        </div>

        {/* Plans Grid - with exit animation */}
        <div
          className={`transition-all duration-500 ease-in-out ${showCustomization
              ? "opacity-0 transform -translate-x-full scale-95 pointer-events-none absolute"
              : "opacity-100 transform translate-x-0 scale-100"
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plansData.map((plan, index) => (
              <div
                key={plan.id}
                className={`bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border-4 border-[#7E4A5712] 
                  hover:border-[#8B5A6B] rounded-2xl p-4 cursor-pointer relative 
                  min-h-[420px] flex flex-col transition-all duration-300 hover:scale-105 
                  hover:shadow-lg animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handlePlanSelect(plan)}
              >
                {/* Plan Header */}
                <div className="text-center mb-4 flex items-end justify-center gap-2">
                  <h3 className="text-base font-bold text-black ">
                    {plan.name}
                  </h3>
                  {plan.price && (
                    <p className="text-xs text-gray-700 mb-0.5">{plan.price}</p>
                  )}
                </div>

                {/* Features List */}
                <div className="flex-1 space-y-1.5 mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="text-xs text-black leading-relaxed opacity-0 animate-fadeInUp"
                      style={{
                        animationDelay: `${index * 100 + featureIndex * 50}ms`,
                      }}
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-105 ${getButtonStyle(
                    plan
                  )}`}
                  disabled={plan.isDefault}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Screen - with enter animation */}
        <div
          className={`transition-all duration-500 ease-in-out ${showCustomization
              ? "opacity-100 transform translate-x-0 scale-100"
              : "opacity-0 transform translate-x-full scale-95 pointer-events-none absolute"
            }`}
        >
          {selectedPlan && (
            <div
              className="bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border-4 border-[#7E4A5712] lg:min-w-[24rem] 
              rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg"
            >
              {/* Price Section */}
              <div className="text-center mb-4 flex items-end gap-2 animate-fadeInUp">
                <h3 className="text-xl font-bold text-black">
                  {selectedPlan.name}
                </h3>
                {selectedPlan.price && (
                  <p className="text-sm text-gray-700 mb-0.5">{selectedPlan.price}</p>
                )}
              </div>

              {/* Choose Avatar */}
              <div
                className="mb-6 animate-fadeInUp"
                style={{ animationDelay: "100ms" }}
              >
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  Choose Avatar any two ({selectedAvatars.length}/2)
                </h4>
                <div className="flex gap-3 justify-center">
                  {avatars.map((avatar, index) => (
                    <img
                      key={avatar.name}
                      src={avatar.src}
                      alt={avatar.alt}
                      className={`w-14 h-14 rounded-full border-2 cursor-pointer 
                        transition-all duration-300 hover:scale-110 animate-fadeInScale ${selectedAvatars.includes(avatar.name)
                          ? "border-[#8B5A6B] shadow-lg scale-105"
                          : "border-transparent "
                        }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => toggleAvatar(avatar.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Choose Language */}
              <div
                className="mb-6 animate-fadeInUp"
                style={{ animationDelay: "200ms" }}
              >
                <h4 className="text-sm font-bold text-gray-700 mb-2">
                  Choose Language any two ({selectedLanguages.length}/2)
                </h4>
                <div className="space-y-2">
                  {languages.map((language, index) => (
                    <label
                      key={language}
                      className={`flex items-center gap-2 text-sm text-gray-800 cursor-pointer 
                        transition-all duration-200 hover:translate-x-1 animate-fadeInLeft`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#8B5A6B] transition-transform duration-200 hover:scale-110"
                        checked={selectedLanguages.includes(language)}
                        onChange={() => toggleLanguage(language)}
                      />
                      <span className="text-gray-800">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div
                className="flex justify-between mt-6 animate-fadeInUp"
                style={{ animationDelay: "300ms" }}
              >
                <button
                  onClick={handleBackToPlans}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium 
                    transition-all duration-300 hover:bg-gray-500 hover:scale-105 hover:shadow-md"
                >
                  Back
                </button>
                <button
                  className="bg-[#8B5A6B] text-white px-6 py-2 rounded-lg font-medium 
                  transition-all duration-300 hover:bg-[#7A4D5E] hover:scale-105 hover:shadow-md"
                >
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
