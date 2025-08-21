import React, { useState, useContext } from "react";
import { AuthContext } from "../../common/helper/AuthContext.jsx";
import { plansData } from "../../data/data.jsx";

import "./modal.css";
import { SubhoExperience } from "../../features/characters/subho/subhoExperience.jsx";
import { Experience } from "../../features/characters/hema/experience.jsx";
import { SitaExperience } from "../../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../../features/characters/ravi/raviExperience.jsx";
import PlanCustomization from "./component/PlanCustomization.jsx";

export default function SubscriptionModal() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const { selectedAvatar, setShowSubscriptionModal, selectedColor } = useContext(AuthContext);

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

  const getButtonStyle = (plan) => {
    if (plan.id === "free") {
      return "bg-[#2D3748] text-white";
    }
    if (plan.id === "premium" || plan.id === "pro") {
      return "bg-[#8B5A6B] text-white hover:bg-[#7A4D5E]";
    }
    return "bg-gray-600 text-white hover:bg-gray-700";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-fadeIn">
      {/* Main Modal Container */}
      <div className="bg-[#C4C3C4] rounded-4xl p-6 max-w-[85%] relative transform animate-slideUp">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => { setShowSubscriptionModal(false), setShowSessionExpiredModal(true) }}
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
                  min-h-[420px] flex flex-col transition-all duration-300 hover:scale-102 
                  hover:shadow-lg animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => { handlePlanSelect(plan) }}
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
                    duration-300 transform hover:scale-102 ${getButtonStyle(
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
          <PlanCustomization
            selectedPlan={selectedPlan}
            setShowCustomization={setShowCustomization}
            setSelectedPlan={setSelectedPlan}
          />
        </div>
      </div>
    </div>
  );
}
