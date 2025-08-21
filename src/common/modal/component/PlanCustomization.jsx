import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../../helper/AuthContext";
import oldMan from "../../../assets/2D/old man.svg";
import oldWoman from "../../../assets/2D/old woman.svg";
import youngMan from "../../../assets/2D/young man.svg";
import youngWoman from "../../../assets/2D/young woman.svg";
import "../modal.css";

function PlanCustomization({ selectedPlan, setSelectedPlan, setShowCustomization, }) {
    const [selectedAvatars, setSelectedAvatars] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([
        "Hindi",
        "Bengali",
    ]);
    const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
    const [isPayButtonHovered, setIsPayButtonHovered] = useState(false);
    const { selectedColor, charBackgroundColor, secondaryColor, hoverSecondaryColor, selectedHoverColor } = useContext(AuthContext);

    const avatars = [
        { src: youngMan, alt: "Ravi", name: "youngMan" },
        { src: youngWoman, alt: "Hema", name: "youngWoman" },
        { src: oldMan, alt: "Subho", name: "oldMan" },
        { src: oldWoman, alt: "Sita", name: "oldWoman" },
    ];

    const languages = ["English", "Hindi", "Bengali"];

    // Automatically select all options for the 'pro' plan
    useEffect(() => {
        if (selectedPlan?.id === 'pro') {
            setSelectedAvatars(avatars.map(a => a.name));
            setSelectedLanguages(languages);
        } else if (selectedPlan?.id === 'premium') {
            // For premium, select one avatar and one language by default
            setSelectedAvatars(['youngMan']);
            setSelectedLanguages(['English']);
        } else {
            // Reset to default for other plans (e.g., free plan)
            setSelectedAvatars([]);
            setSelectedLanguages(["Hindi", "Bengali"]);
        }
    }, [selectedPlan]);

    const handleBackToPlans = () => {
        setShowCustomization(false);
        // Reset selections when going back
        setTimeout(() => setSelectedPlan(null), 300);
    };

    const toggleAvatar = (avatar) => {
        if (selectedPlan?.id === 'pro') return; // Prevent changes for pro plan
        if (selectedPlan?.id === 'premium' && avatar === 'youngMan') return; // Prevent unselecting default for premium

        setSelectedAvatars((prev) => {
            // Handle unselecting an avatar
            if (prev.includes(avatar)) {
                return prev.filter((a) => a !== avatar);
            }

            // Handle adding a new avatar
            if (selectedPlan?.id === 'premium') {
                // If 2 are already selected, replace the non-default one.
                if (prev.length === 2) {
                    return ['youngMan', avatar];
                }
                return [...prev, avatar];
            } else if (prev.length < 2) { // For other plans, add if there's space.
                return [...prev, avatar];
            }

            // If limit is reached on non-premium plans, do nothing.
            return prev;
        });
    };

    const toggleLanguage = (language) => {
        if (selectedPlan?.id === 'pro') return; // Prevent changes for pro plan
        if (selectedPlan?.id === 'premium' && language === 'English') return; // Prevent unselecting default for premium

        setSelectedLanguages((prev) => {
            // Handle unselecting a language
            if (prev.includes(language)) {
                return prev.filter((l) => l !== language);
            }

            // Handle adding a new language
            if (selectedPlan?.id === 'premium') {
                // If 2 are already selected, replace the non-default one.
                if (prev.length === 2) {
                    return ['English', language];
                }
                return [...prev, language];
            } else if (prev.length < 2) { // For other plans, add if there's space.
                return [...prev, language];
            }

            // If limit is reached on non-premium plans, do nothing.
            return prev;
        });
    };

    return (
        <>
            {selectedPlan && (
                <div
                    className="bg-gradient-to-b from-[#76DE4812] to-[#7E4A5712] border-4 lg:min-w-[24rem] 
              rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg"
                    style={{ borderColor: secondaryColor }}
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
                            {selectedPlan?.id === 'pro'
                                ? 'All avatars included'
                                : `Choose one more avatar (${selectedAvatars.length}/2)`}
                        </h4>
                        <div className="flex gap-3 justify-center">
                            {avatars.map((avatar, index) => (
                                <img
                                    key={avatar.name}
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    className={`w-14 h-14 rounded-full border-2 
                        transition-all duration-300 hover:scale-110 animate-fadeInScale 
                        ${(selectedPlan?.id === 'pro' || (selectedPlan?.id === 'premium' && avatar.name === 'youngMan'))
                                            ? 'cursor-not-allowed'
                                            : 'cursor-pointer'}
                        ${selectedAvatars.includes(avatar.name) ? "shadow-lg scale-105" : ""}`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        borderColor: selectedAvatars.includes(avatar.name)
                                            ? selectedHoverColor
                                            : "transparent",
                                    }}
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
                            {selectedPlan?.id === 'pro'
                                ? 'All languages included'
                                : `Choose one more language (${selectedLanguages.length}/2)`}
                        </h4>
                        <div className="space-y-2">
                            {languages.map((language, index) => (
                                <label
                                    key={language}
                                    className={`flex items-center gap-2 text-sm text-gray-800 
                        transition-all duration-200 hover:translate-x-1 animate-fadeInLeft
                        ${(selectedPlan?.id === 'pro' || (selectedPlan?.id === 'premium' && language === 'English'))
                                            ? 'cursor-not-allowed'
                                            : 'cursor-pointer'}`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 transition-transform duration-200 hover:scale-110"
                                        style={{ accentColor: selectedHoverColor }}
                                        checked={selectedLanguages.includes(language)}
                                        disabled={selectedPlan?.id === 'pro' || (selectedPlan?.id === 'premium' && language === 'English')}
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
                    transition-all duration-300 hover:bg-gray-500 hover:scale-102 hover:shadow-md"
                            style={{ backgroundColor: isBackButtonHovered ? hoverSecondaryColor : secondaryColor }}
                            onMouseEnter={() => setIsBackButtonHovered(true)}
                            onMouseLeave={() => setIsBackButtonHovered(false)}
                        >
                            Back
                        </button>
                        <button
                            className={`bg-[${selectedColor}] text-white px-6 py-2 rounded-lg font-medium 
                  transition-all duration-300 hover:bg-[#7A4D5E] hover:scale-102 hover:shadow-md`}
                            style={{ backgroundColor: isPayButtonHovered ? selectedHoverColor : selectedColor }}
                            onMouseEnter={() => setIsPayButtonHovered(true)}
                            onMouseLeave={() => setIsPayButtonHovered(false)}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlanCustomization