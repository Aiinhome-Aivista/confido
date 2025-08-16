import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("hema");

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, selectedAvatar, setSelectedAvatar }}>
            {children}
        </AuthContext.Provider>
    );
}