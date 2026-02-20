"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import LoadingButton from "@/components/ui/LoadingButton";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const { resetPassword } = useAuth();

    const getHumanReadableError = (error: unknown) => {
        const err = error as { code?: string };
        const code = err?.code || "";
        if (code === 'auth/user-not-found') {
            return "No user found with this email address.";
        }
        if (code === 'auth/invalid-email') {
            return "Please enter a valid email address.";
        }
        if (code === 'auth/too-many-requests') {
            return "Too many requests. Please try again later.";
        }
        if (code === 'auth/network-request-failed') {
            return "Network error. Please check your internet connection.";
        }
        return "An unexpected error occurred. Please try again.";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await resetPassword(email);
            setMessage({ text: "Password reset link sent! Check your inbox.", type: "success" });
        } catch (err: unknown) {
            setMessage({ text: getHumanReadableError(err), type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Reset Password</h1>
                <p className={styles.subtitle}>Enter your email to receive a reset link</p>

                {message && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: message.type === 'success' ? '#e6f4fa' : '#fee2e2',
                        color: message.type === 'success' ? '#0070a8' : '#991b1b',
                        border: message.type === 'success' ? '1px solid var(--blue-200)' : '1px solid #f87171',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {message.text}
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
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <LoadingButton isLoading={loading} loadingText="Sending Link...">
                        Send Reset Link
                    </LoadingButton>
                </form>

                <div className={styles.footer}>
                    Remember your password?{" "}
                    <Link href="/login" className={styles.link}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
