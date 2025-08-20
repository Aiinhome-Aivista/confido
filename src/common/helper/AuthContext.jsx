import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [hoverAvatar, setHoverAvatar] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("Ravi");
    const [selectedAvatarId, setSelectedAvatarId] = useState();
    const [currentVoiceType, setCurrentVoiceType] = useState("adultWoman");
    const [greeting, setGreeting] = useState(true);
    const [avatarSpeech, setAvatarSpeech] = useState("");
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [sessionTerminated, setSessionTerminated] = useState(false);
    const [selectedColor, setSelectedColor] = useState("rgba(178, 239, 97, 1)");
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(true);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

    // 👇 Run once on app mount
    useEffect(() => {
        if (sessionStorage.getItem("sessionId")) {
            sessionStorage.removeItem("sessionId");
            console.log(" sessionId cleared on reload");
        }
    }, []);


    return (
        <AuthContext.Provider value={{
            isLogin,
            setIsLogin,
            selectedAvatar,
            setSelectedAvatar,
            currentVoiceType,
            setCurrentVoiceType,
            greeting, setGreeting,
            avatarSpeech, setAvatarSpeech,
            openLoginModal, setOpenLoginModal,
            hoverAvatar, setHoverAvatar,
            sessionTerminated, setSessionTerminated,
            selectedColor, setSelectedColor,
            selectedAvatarId, setSelectedAvatarId,
            showSessionExpiredModal, setShowSessionExpiredModal,
            showSubscriptionModal, setShowSubscriptionModal
        }}>

            {children}

        </AuthContext.Provider>
    );
}