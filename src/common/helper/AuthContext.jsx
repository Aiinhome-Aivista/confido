import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("hema");
    const [openLoginModal, setOpenLoginModal] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, selectedAvatar, setSelectedAvatar, openLoginModal, setOpenLoginModal }}>
            {children}
        </AuthContext.Provider>
    );
}