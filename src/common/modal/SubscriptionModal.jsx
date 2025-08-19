// import React from "react";

// export default function SubscriptionModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscription</h2>
//         <p className="text-gray-600">Welcome to the subscription modal 🚀</p>

//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//         >
//           ✕
//         </button>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>

      
//     </div>



//   );
// }

import React, { useState } from 'react';

export default function SubscriptionModal() {
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const [openPricingModal, setOpenPricingModal] = useState(true);

    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: 'Free',
            features: [
                'Avatars: 1 of 4 (switch anytime within the chosen one)',
                'Languages: 1 of 3 (default English)',
                'Session time: 15 min / session',
                'Daily sessions: up to 10 / day',
                'Conversation history: last 50 chats saved',
                'Export transcripts: TXT only',
                'Support: Email (48-72h)',
                'Device limit: 1 logged-in device at a time'
            ],
            buttonText: 'Selected',
            isDefault: true
        },
        {
            id: 'premium',
            name: 'Rs. 299/-',
            price: 'Monthly',
            features: [
                'Avatars: 2 of 4 unlocked',
                'Languages: 2 of 3',
                'Session time: 30 min / session',
                'Daily sessions: up to 30 / day',
                'Conversation history: 200 chats saved',
                'Export transcripts: TXT & PDF',
                'Voice responses: standard',
                'Support: Priority email (24-48h)',
                'Device limit: 2 logged-in devices'
            ],
            buttonText: 'Select',
            isPopular: true
        },
        {
            id: 'pro',
            name: 'Rs. 599/-',
            price: 'Monthly',
            features: [
                'Avatars: All 4 unlocked',
                'Languages: All 3',
                'Session time: 60 min / session',
                'Daily sessions: Unlimited',
                'Conversation history: Unlimited',
                'Export transcripts: TXT, PDF & CSV',
                'Voice responses: enhanced (clearer TTS)',
                'Support: Priority (2-4h) with chat',
                'Device limit: 3 logged-in devices',
                'Beta access: new avatars & features first'
            ],
            buttonText: 'Select',
            isPopular: false
        }
    ];

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
    };

    const socialButtonStyle = {
        backgroundColor: "rgba(217, 217, 217, 1)",
        opacity: "0.8",
        borderRadius: "50%",
        transform: "scale(1)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        willChange: "transform, background-color, box-shadow",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        position: "relative",
        overflow: "hidden",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)";

        const pulse = document.createElement("div");
        pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background: rgba(59, 130, 246, 0.1);
            transform: translate(-50%, -50%) scale(0);
            animation: pulse 0.6s ease-out;
            pointer-events: none;
        `;
        e.currentTarget.appendChild(pulse);
        setTimeout(() => pulse.remove(), 600);
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.backgroundColor = selectedPlan === e.currentTarget.dataset.planid ? "rgba(59, 130, 246, 0.05)" : "rgba(255, 255, 255, 1)";
    };

    if (!openPricingModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-50">
            <style jsx>{`
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
                .pricing-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                .pricing-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }
                .pricing-card.selected {
                    border: 2px solid #3b82f6;
                    background: rgba(59, 130, 246, 0.05);
                }
                .pricing-card.popular {
                    position: relative;
                    border: 2px solid #3b82f6;
                }
                .popular-badge {
                    position: absolute;
                    top: -10px;
                    right: 15px;
                    background: linear-gradient(135deg, #f97316, #dc2626);
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                }
                .avatar-placeholder {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    margin: 0 auto 16px auto;
                }
            `}</style>
            
            <div className="bg-[#F8F8F8] backdrop-blur-lg rounded-4xl p-6 w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="flex flex-row items-start justify-between mb-6">
                    <div></div>
                    <button 
                        onClick={() => setOpenPricingModal(false)} 
                        className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center text-white font-bold transition-colors"
                    >
                        
                    </button>
                </div>

                {/* Avatar and Title */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="avatar-placeholder">👤</div>
                    <p className="text-xl font-extrabold text-gray-800">Choose your plan</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`pricing-card rounded-xl p-6 cursor-pointer relative ${
                                selectedPlan === plan.id ? 'selected' : ''
                            } ${plan.isPopular ? 'popular' : ''}`}
                            onClick={() => handlePlanSelect(plan.id)}
                        >
                            {plan.isPopular && (
                                <div className="popular-badge">🔥 Popular</div>
                            )}
                            
                            {/* Plan Header */}
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{plan.name}</h3>
                                <p className="text-sm text-gray-600">{plan.price}</p>
                            </div>

                            {/* Features List */}
                            <div className="space-y-2 mb-6">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="text-xs text-gray-700 leading-relaxed">
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* Select Button */}
                            <button
                                data-planid={plan.id}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                    plan.isDefault 
                                        ? 'bg-gray-800 text-white cursor-default'
                                        : selectedPlan === plan.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-600 text-white hover:bg-blue-600'
                                }`}
                                onMouseEnter={!plan.isDefault ? handleMouseEnter : undefined}
                                onMouseLeave={!plan.isDefault ? handleMouseLeave : undefined}
                                disabled={plan.isDefault}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Need help choosing? <span className="text-blue-600 cursor-pointer hover:underline">Contact support</span>
                    </p>
                </div>
            </div>
        </div>
    );
}