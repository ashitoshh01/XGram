"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
    sendEmailVerification,
    User as FirebaseUser
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface User {
    name: string;
    email: string;
    role: "user" | "admin";
    uid: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser && firebaseUser.emailVerified) {
                const user: User = {
                    name: firebaseUser.displayName || "",
                    email: firebaseUser.email || "",
                    uid: firebaseUser.uid,
                    role: "user", // Default role, can be enhanced with custom claims or DB
                };
                setUser(user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                router.push(`/verify-email?email=${encodeURIComponent(email)}`);
                throw new Error("Please verify your email address before logging in.");
            }

            router.push("/profile");
        } catch (error) {
            console.error("Login failed:", (error as Error).message);
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            await sendEmailVerification(userCredential.user);
            await signOut(auth);

            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        } catch (error) {
            console.error("Signup failed:", (error as Error).message);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/profile");
        } catch (error) {
            if ((error as { code?: string }).code === 'auth/popup-closed-by-user') {
                console.warn("Google sign-in popup closed by user.");
                return; // Gracefully exit without throwing
            }
            console.error("Google sign in failed:", (error as Error).message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", (error as Error).message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                signup,
                loginWithGoogle,
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
