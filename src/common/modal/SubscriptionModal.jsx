import React, { useState } from "react";
import { plansData } from "../../data/data.jsx";
import oldMan from "../../assets/2D/old man.svg";
import oldWoman from "../../assets/2D/old woman.svg";
import youngMan from "../../assets/2D/young man.svg";
import youngWoman from "../../assets/2D/young woman.svg";

export default function SubscriptionModal({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowCustomization(true);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      {/* Main Modal Container */}
      <div className="bg-[#C4C3C4] rounded-3xl p-6 max-w-[85%]  relative">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="w-4 h-4 rounded-full bg-[#FF6B6B] hover:bg-red-600 transition-colors"
          ></button>
        </div>

        {/* Avatar and Title */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-12 h-12 bg-[#8B5A6B] rounded-full flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-[#D4A574] rounded-full"></div>
          </div>
          <h2 className="text-lg font-bold text-black">Choose your plan</h2>
        </div>

        {/* Pricing Cards */}
        {!showCustomization && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plansData.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#E8F5E8] border-2 border-gray-300 hover:border-[#4A90E2] rounded-2xl p-4 cursor-pointer relative min-h-[420px] flex flex-col transition-all duration-300`}
                onClick={() => handlePlanSelect(plan)}
              >
                {/* Plan Header */}
                <div className="text-center mb-4">
                  <h3 className="text-base font-bold text-black mb-1">
                    {plan.name}
                  </h3>
                  {plan.price && (
                    <p className="text-xs text-gray-600">{plan.price}</p>
                  )}
                </div>

                {/* Features List */}
                <div className="flex-1 space-y-1.5 mb-4">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="text-xs text-black leading-relaxed"
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer duration-300 ${getButtonStyle(
                    plan
                  )}`}
                  disabled={plan.isDefault}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Customization Screen */}
        {showCustomization && selectedPlan && (
          <div className="bg-[#E8F5E8] border border-gray-300 rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
            {/* Price Section */}
            <div className="text-center mb-4 flex items-end gap-2 justify-center">
              <h3 className="text-xl font-bold text-black">
                {selectedPlan.name}
              </h3>
              {selectedPlan.price && (
                <p className="text-sm text-gray-600">{selectedPlan.price}</p>
              )}
            </div>

            {/* Choose Avatar */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Choose Avatar any two
              </h4>
              <div className="flex gap-3 justify-center">
                <img
                  src={oldMan}
                  alt="Old Man"
                  className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
                />
                <img
                  src={oldWoman}
                  alt="Old Woman"
                  className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
                />
                <img
                  src={youngMan}
                  alt="Young Man"
                  className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
                />
                <img
                  src={youngWoman}
                  alt="Young Woman"
                  className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
                />
              </div>
            </div>

            {/* Choose Language */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Choose Language any two
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-600"
                  />
                  English
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-600"
                    defaultChecked
                  />
                  Hindi
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-600"
                    defaultChecked
                  />
                  Bengali
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowCustomization(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-500 transition"
              >
                Back
              </button>
              <button className="bg-[#8B5A6B] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#7A4D5E] transition">
                Pay
              </button>
            </div>
          </div>
        )}

        {/* Bottom spacing */}
        {/* <div className="h-4"></div> */}
      </div>
    </div>
  );
}
