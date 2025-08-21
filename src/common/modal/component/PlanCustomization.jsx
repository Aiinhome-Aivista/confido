import React, { useState, useContext } from 'react'
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
    const { selectedColor } = useContext(AuthContext);

    const avatars = [
        { src: oldMan, alt: "Old Man", name: "oldMan" },
        { src: oldWoman, alt: "Old Woman", name: "oldWoman" },
        { src: youngMan, alt: "Young Man", name: "youngMan" },
        { src: youngWoman, alt: "Young Woman", name: "youngWoman" },
    ];

    const languages = ["English", "Hindi", "Bengali"];

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

    return (
        <>
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
                    transition-all duration-300 hover:bg-gray-500 hover:scale-102 hover:shadow-md"
                        >
                            Back
                        </button>
                        <button
                            className={`bg-[${selectedColor}] text-white px-6 py-2 rounded-lg font-medium 
                  transition-all duration-300 hover:bg-[#7A4D5E] hover:scale-102 hover:shadow-md`}
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