import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}