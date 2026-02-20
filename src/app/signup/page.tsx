"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/auth.module.css";
import Link from "next/link";

import LoadingButton from "@/components/ui/LoadingButton";
import GoogleButton from "@/components/ui/GoogleButton";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signup, loginWithGoogle } = useAuth();

    const getHumanReadableError = (error: unknown) => {
        const err = error as { code?: string };
        const code = err?.code || "";
        if (code === 'auth/email-already-in-use') {
            return "This email is already registered. Please sign in instead.";
        }
        if (code === 'auth/invalid-email') {
            return "Please enter a valid email address.";
        }
        if (code === 'auth/weak-password') {
            return "Password is too weak. Please use at least 6 characters.";
        }
        if (code === 'auth/network-request-failed') {
            return "Network error. Please check your internet connection.";
        }
        return "An unexpected error occurred. Please try again.";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signup(name, email, password);
        } catch (err: unknown) {
            setError(getHumanReadableError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        try {
            await loginWithGoogle();
        } catch (err: unknown) {
            const errorObj = err as { code?: string };
            if (errorObj?.code !== 'auth/popup-closed-by-user') {
                setError(getHumanReadableError(err));
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Get started with XGram today</p>

                {error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        border: '1px solid #f87171',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <LoadingButton isLoading={loading} loadingText="Creating Account...">
                        Create Account
                    </LoadingButton>
                </form>

                <div className={styles.separator}>Or continue with</div>

                <GoogleButton onClick={handleGoogleLogin} />

                <div className={styles.footer}>
                    Already have an account?{" "}
                    <Link href="/login" className={styles.link}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
