import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("hema");
     const [currentVoiceType, setCurrentVoiceType] = useState("adultWoman");
    const [greeting, setGreeting] = useState(true);
    const [avatarSpeech, setAvatarSpeech] = useState("");
        const [openLoginModal, setOpenLoginModal] = useState(false);

 

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
             openLoginModal, setOpenLoginModal
        }}>
  
        </AuthContext.Provider>
    );
}