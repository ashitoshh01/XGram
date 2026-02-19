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
    const { login, loginWithGoogle } = useAuth();
    // router is unused

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            // Error is already logged in context, and popup-closed is ignored
            if ((error as { code?: string }).code !== 'auth/popup-closed-by-user') {
                alert((error as Error).message);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to access your account</p>

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
