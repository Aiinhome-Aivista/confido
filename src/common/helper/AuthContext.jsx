import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("hema");
    const [greeting, setGreeting] = useState(true);
    const [avatarSpeech, setAvatarSpeech] = useState("");

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, selectedAvatar, setSelectedAvatar, greeting, setGreeting, avatarSpeech, setAvatarSpeech }}>
            {children}
        </AuthContext.Provider>
    );
}