import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("hema");
    const [hoverAvatar, setHoverAvatar] = useState("");
     const [currentVoiceType, setCurrentVoiceType] = useState("adultWoman");
    const [greeting, setGreeting] = useState(true);
    const [avatarSpeech, setAvatarSpeech] = useState("");
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [sessionTerminated, setSessionTerminated] = useState(false);

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
            sessionTerminated, setSessionTerminated
        }}>

            {children}

        </AuthContext.Provider>
    );
}