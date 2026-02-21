"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    User as FirebaseUser
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface User {
    name: string;
    email: string;
    role: "user" | "admin";
    uid: string;
    photoURL?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (name: string, photoURL?: string) => Promise<void>;
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
                    photoURL: firebaseUser.photoURL || undefined,
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

            toast.success("Logged in successfully!");
            router.push("/");
        } catch (error) {
            console.error("Login failed:", (error as Error).message);
            toast.error("Login failed: " + (error as Error).message);
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

            toast.success("Signup successful! Please check your email to verify.");
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        } catch (error) {
            console.error("Signup failed:", (error as Error).message);
            toast.error("Signup failed: " + (error as Error).message);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Logged in with Google successfully!");
            router.push("/");
        } catch (error) {
            if ((error as { code?: string }).code === 'auth/popup-closed-by-user') {
                console.warn("Google sign-in popup closed by user.");
                return; // Gracefully exit without throwing
            }
            console.error("Google sign in failed:", (error as Error).message);
            toast.error("Google sign in failed: " + (error as Error).message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", (error as Error).message);
            toast.error("Logout failed: " + (error as Error).message);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Please check your inbox.");
        } catch (error) {
            console.error("Reset password failed:", (error as Error).message);
            toast.error("Reset password failed: " + (error as Error).message);
            throw error;
        }
    };

    const updateUserProfile = async (name: string, photoURL?: string) => {
        try {
            if (!auth.currentUser) throw new Error("No user is currently signed in.");

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL || auth.currentUser.photoURL
            });

            setUser((prev) => prev ? { ...prev, name, photoURL } : null);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Update profile failed:", (error as Error).message);
            toast.error("Update profile failed: " + (error as Error).message);
            throw error;
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
                resetPassword,
                updateUserProfile,
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
