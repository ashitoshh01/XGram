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
    const { signup, loginWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(name, email, password);
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
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Get started with XGram today</p>

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
