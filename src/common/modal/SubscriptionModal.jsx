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
  const [hoveredPlanId, setHoveredPlanId] = useState(null);
  const [hoverPlanCard, setHoverPlanCard] = useState(null);
  const { selectedAvatar, setShowSubscriptionModal, selectedColor, selectedHoverColor, charBackgroundColor, secondaryColor, hoverSecondaryColor, setShowSessionExpiredModal } = useContext(AuthContext);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-fadeIn">
      {/* Main Modal Container */}
      <div className="bg-[#C4C3C4] rounded-4xl p-6 max-w-[85%] relative transform animate-slideUp"
        style={{ boxShadow: "0 16px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)" }}>
        {/* Close Button */}
        <div className="flex justify-end mb-1">
          <button
            onClick={() => { setShowSubscriptionModal(false), setShowSessionExpiredModal(true) }}
            className="w-4 h-4 rounded-full bg-[#CA4C4C] cursor-pointer transition-all duration-200 hover:scale-110"
          ></button>
        </div>

        {/* Avatar and Title */}
        <div className="flex flex-col items-center justify-center mb-3">
          <div className="transform transition-all duration-300  avatar-container w-24 h-24  rounded-full border-2 border-[#7E4A5712] overflow-hidden shadow-md">
            {renderAvatar()}
          </div>
          <h2 className="text-lg font-bold text-black animate-fadeInUp">
            {showCustomization ? "Benefits you will get" : "Choose your plan"}
          </h2>
        </div>

        {/* Plans Grid - with exit animation */}
        <div
          className={`transition-all duration-500 ease-in-out max-h-[65vh]
  overflow-y-auto p-2 ${
    showCustomization
      ? "opacity-0 transform -translate-x-full scale-95 pointer-events-none absolute"
      : "opacity-100 transform translate-x-0 scale-100"
  }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {plansData.map((plan, index) => (
              <div
                key={plan.id}
                className={`bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border-4 border-[#7E4A5712] 
                  hover:border-[#8B5A6B] rounded-2xl p-4 relative 
                  min-h-[420px] flex flex-col transition-all duration-300 hover:scale-102 
                  hover:shadow-lg animate-fadeInUp`}
                onMouseEnter={() => !plan.isDefault && setHoverPlanCard(plan.id)}
                onMouseLeave={() => setHoverPlanCard(null)}
                style={{
                  animationDelay: `${index * 100}ms`, borderColor: plan.isDefault
                    ? secondaryColor
                    : hoverPlanCard === plan.id ? hoverSecondaryColor : secondaryColor, scale: plan.isDefault
                      ? 1
                      : hoveredPlanId === plan.id ? 1.02 : 1
                }}
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

                {plan.id === "free" && (
                  <div className="absolute top-2 right-2 ">
                    <div className="w-4 h-4 rounded-full bg-[#7E4A5780] hover:bg-[#5d374080] transition-all duration-200 hover:scale-110"></div>
                  </div>
                )}

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
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white transition-all 
                    duration-300 transform hover:scale-102 ${plan.isDefault ? 'cursor-pointer' : 'cursor-pointer'}`}
                  style={{
                    backgroundColor: plan.isDefault
                      ? '#2D3748' // Specific color for the disabled button
                      : hoveredPlanId === plan.id ? selectedHoverColor : selectedColor
                  }}
                  onMouseEnter={() => !plan.isDefault && setHoveredPlanId(plan.id)}
                  onMouseLeave={() => setHoveredPlanId(null)}
                  disabled={plan.isDefault}
                  onClick={() => !plan.isDefault && handlePlanSelect(plan)}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Screen - with enter animation */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showCustomization
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
