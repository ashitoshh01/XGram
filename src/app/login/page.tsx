"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Assuming context is exported correctly
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import LoadingButton from "@/components/ui/LoadingButton";
import GoogleButton from "@/components/ui/GoogleButton";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, loginWithGoogle } = useAuth();
    // router is unused

    const getHumanReadableError = (error: unknown) => {
        const err = error as { code?: string };
        const code = err?.code || "";
        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
            return "Invalid credentials. Please check your email and password.";
        }
        if (code === 'auth/too-many-requests') {
            return "Too many failed attempts. Please try again later.";
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
            await login(email, password);
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
            // Error is already logged in context, and popup-closed is ignored
            const errorObj = err as { code?: string };
            if (errorObj?.code !== 'auth/popup-closed-by-user') {
                setError(getHumanReadableError(err));
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to access your account</p>

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div style={{ textAlign: "right", marginTop: "-5px" }}>
                            <Link href="/forgot-password" className={styles.link} style={{ fontSize: "13px" }}>
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <LoadingButton isLoading={loading} loadingText="Signing In...">
                        Sign In
                    </LoadingButton>
                </form>

                <div className={styles.separator}>Or continue with</div>

                <GoogleButton onClick={handleGoogleLogin} />

                <div className={styles.footer}>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className={styles.link}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
