"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    role: "user" | "admin";
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string) => void;
    signup: (name: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem("xgram_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        // Mock login logic
        const mockUser: User = {
            name: "Ashitosh", // Default mock name
            email: email,
            role: "user",
        };
        setUser(mockUser);
        localStorage.setItem("xgram_user", JSON.stringify(mockUser));
        router.push("/profile");
    };

    const signup = (name: string, email: string) => {
        // Mock signup logic
        const mockUser: User = {
            name: name,
            email: email,
            role: "user",
        };
        setUser(mockUser);
        localStorage.setItem("xgram_user", JSON.stringify(mockUser));
        router.push("/profile");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("xgram_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
