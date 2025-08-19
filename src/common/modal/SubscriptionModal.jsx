// import React, { useState } from "react";
// import { plansData } from "../../data/data.jsx";
// import oldMan from "../../assets/2D/old man.svg";
// import oldWoman from "../../assets/2D/old woman.svg";
// import youngMan from "../../assets/2D/young man.svg";
// import youngWoman from "../../assets/2D/young woman.svg";

// export default function SubscriptionModal({ onClose }) {
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [showCustomization, setShowCustomization] = useState(false);

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setShowCustomization(true);
//   };

//   const getButtonStyle = (plan) => {
//     if (plan.id === "free") {
//       return "bg-[#2D3748] text-white";
//     }
//     if (plan.id === "premium" || plan.id === "pro") {
//       return "bg-[#8B5A6B] text-white hover:bg-[#7A4D5E]";
//     }
//     return "bg-gray-600 text-white hover:bg-gray-700";
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
//       {/* Main Modal Container */}
//       <div className="bg-[#C4C3C4] rounded-3xl p-6 max-w-[85%]  relative">
//         {/* Close Button */}
//         <div className="flex justify-end mb-2">
//           <button
//             onClick={onClose}
//             className="w-4 h-4 rounded-full bg-[#FF6B6B] hover:bg-red-600 transition-colors"
//           ></button>
//         </div>

//         {/* Avatar and Title */}
//         <div className="flex flex-col items-center justify-center mb-6">
//           <div className=" mb-3">
//             <img
//               src={oldWoman}
//               alt="Old Woman"
//               className="w-16 h-16 rounded-full border-2 border-transparent"
//             />
//           </div>
//           <h2 className="text-lg font-bold text-black">Choose your plan</h2>
//         </div>

     
//         {!showCustomization && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {plansData.map((plan) => (
//               <div
//                 key={plan.id}
//                 className={`bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border border-[#7E4A5712] hover:outline-[#8B5A6B]  hover:outline-2 rounded-2xl p-4 cursor-pointer relative min-h-[420px] flex flex-col transition-all duration-300`}
//                 onClick={() => handlePlanSelect(plan)}
//               >
//                 {/* Plan Header */}
//                 <div className="text-center mb-4">
//                   <h3 className="text-base font-bold text-black mb-1">
//                     {plan.name}
//                   </h3>
//                   {plan.price && (
//                     <p className="text-xs text-gray-600">{plan.price}</p>
//                   )}
//                 </div>

//                 {/* Features List */}
//                 <div className="flex-1 space-y-1.5 mb-4">
//                   {plan.features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="text-xs text-black leading-relaxed"
//                     >
//                       {feature}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Select Button */}
//                 <button
//                   className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer duration-300 ${getButtonStyle(
//                     plan
//                   )}`}
//                   disabled={plan.isDefault}
//                 >
//                   {plan.buttonText}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Customization Screen */}
//         {showCustomization && selectedPlan && (
//           <div className="bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border border-[#7E4A5712] rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
//             {/* Price Section */}
//             <div className="text-center mb-4 flex items-end gap-2 ">
//               <h3 className="text-xl font-bold text-black">
//                 {selectedPlan.name}
//               </h3>
//               {selectedPlan.price && (
//                 <p className="text-sm text-gray-600">{selectedPlan.price}</p>
//               )}
//             </div>

//             {/* Choose Avatar */}
//             <div className="mb-6">
//               <h4 className="text-sm font-bold text-gray-700 mb-2">
//                 Choose Avatar any two
//               </h4>
//               <div className="flex gap-3 justify-center">
//                 <img
//                   src={oldMan}
//                   alt="Old Man"
//                   className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
//                 />
//                 <img
//                   src={oldWoman}
//                   alt="Old Woman"
//                   className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
//                 />
//                 <img
//                   src={youngMan}
//                   alt="Young Man"
//                   className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
//                 />
//                 <img
//                   src={youngWoman}
//                   alt="Young Woman"
//                   className="w-14 h-14 rounded-full border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
//                 />
//               </div>
//             </div>

//             {/* Choose Language */}
//             <div className="mb-6">
//               <h4 className="text-sm font-bold text-gray-700 mb-2">
//                 Choose Language any two
//               </h4>
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm text-gray-800">
//                   <input type="checkbox" className="w-4 h-4 accent-[#8B5A6B]" />
//                   English
//                 </label>
//                 <label className="flex items-center gap-2 text-sm text-gray-800">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-[#8B5A6B]"
//                     defaultChecked
//                   />
//                   Hindi
//                 </label>
//                 <label className="flex items-center gap-2 text-sm text-gray-800">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-[#8B5A6B]"
//                     defaultChecked
//                   />
//                   Bengali
//                 </label>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={() => setShowCustomization(false)}
//                 className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-500 transition"
//               >
//                 Back
//               </button>
//               <button className="bg-[#8B5A6B] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#7A4D5E] transition">
//                 Pay
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Bottom spacing */}
//         {/* <div className="h-4"></div> */}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { plansData } from "../../data/data.jsx";
import oldMan from "../../assets/2D/old man.svg";
import oldWoman from "../../assets/2D/old woman.svg";
import youngMan from "../../assets/2D/young man.svg";
import youngWoman from "../../assets/2D/young woman.svg";

export default function SubscriptionModal({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(['Hindi', 'Bengali']);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Add a small delay for better UX
    setTimeout(() => setShowCustomization(true), 150);
  };

  const handleBackToPlans = () => {
    setShowCustomization(false);
    // Reset selections when going back
    setTimeout(() => setSelectedPlan(null), 300);
  };

  const toggleAvatar = (avatar) => {
    setSelectedAvatars(prev => {
      if (prev.includes(avatar)) {
        return prev.filter(a => a !== avatar);
      } else if (prev.length < 2) {
        return [...prev, avatar];
      }
      return prev;
    });
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages(prev => {
      if (prev.includes(language)) {
        return prev.filter(l => l !== language);
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
    { src: youngWoman, alt: "Young Woman", name: "youngWoman" }
  ];

  const languages = ["English", "Hindi", "Bengali"];

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

        {/* Avatar and Title */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="mb-3 transform transition-all duration-300">
            <img
              src={oldWoman}
              alt="Old Woman"
              className="w-16 h-16 rounded-full border-2 border-transparent animate-bounce-subtle"
            />
          </div>
          <h2 className="text-lg font-bold text-black animate-fadeInUp">
            {showCustomization ? "Customize Your Plan" : "Choose your plan"}
          </h2>
        </div>

        {/* Plans Grid - with exit animation */}
        <div className={`transition-all duration-500 ease-in-out ${
          showCustomization 
            ? 'opacity-0 transform -translate-x-full scale-95 pointer-events-none absolute' 
            : 'opacity-100 transform translate-x-0 scale-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plansData.map((plan, index) => (
              <div
                key={plan.id}
                className={`bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border border-[#7E4A5712] 
                  hover:outline-[#8B5A6B] hover:outline-2 rounded-2xl p-4 cursor-pointer relative 
                  min-h-[420px] flex flex-col transition-all duration-300 hover:scale-105 
                  hover:shadow-lg animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
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
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="text-xs text-black leading-relaxed opacity-0 animate-fadeInUp"
                      style={{ animationDelay: `${(index * 100) + (featureIndex * 50)}ms` }}
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all 
                    duration-300 transform hover:scale-105 ${getButtonStyle(plan)}`}
                  disabled={plan.isDefault}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Screen - with enter animation */}
        <div className={`transition-all duration-500 ease-in-out ${
          showCustomization 
            ? 'opacity-100 transform translate-x-0 scale-100' 
            : 'opacity-0 transform translate-x-full scale-95 pointer-events-none absolute'
        }`}>
          {selectedPlan && (
            <div className="bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border border-[#7E4A5712] 
              rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
              {/* Price Section */}
              <div className="text-center mb-4 flex items-end gap-2 justify-center animate-fadeInUp">
                <h3 className="text-xl font-bold text-black">
                  {selectedPlan.name}
                </h3>
                {selectedPlan.price && (
                  <p className="text-sm text-gray-600">{selectedPlan.price}</p>
                )}
              </div>

              {/* Choose Avatar */}
              <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
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
                        transition-all duration-300 hover:scale-110 animate-fadeInScale ${
                        selectedAvatars.includes(avatar.name)
                          ? 'border-[#8B5A6B] shadow-lg scale-105'
                          : 'border-transparent hover:border-indigo-500'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => toggleAvatar(avatar.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Choose Language */}
              <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
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
                      {language}
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <button
                  onClick={handleBackToPlans}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium 
                    transition-all duration-300 hover:bg-gray-500 hover:scale-105 hover:shadow-md"
                >
                  Back
                </button>
                <button className="bg-[#8B5A6B] text-white px-6 py-2 rounded-lg font-medium 
                  transition-all duration-300 hover:bg-[#7A4D5E] hover:scale-105 hover:shadow-md">
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-2px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
      `}</style>
    </div>
  );
}
