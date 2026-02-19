"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import styles from "./verify.module.css";

const VerifyEmailContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    useEffect(() => {
        // Optional: If no email param, maybe redirect to login?
        // But for now, let's just show a generic message or allow them to stay.
        if (!email) {
            // router.push("/login"); // Uncomment if strict redirection needed
        }
    }, [email, router]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <Mail size={48} className={styles.icon} />
                </div>

                <h1 className={styles.title}>Check your email</h1>

                <p className={styles.message}>
                    We have sent you a verification email to {email}. Please verify it and log in.
                </p>

                <p className={styles.subtext}>
                    Please verify your email address to complete your registration and log in to your account.
                </p>

                <div className={styles.actions}>
                    <Link href="/login" className={styles.loginButton}>
                        Log In
                    </Link>

                    <Link href="/" className={styles.homeLink}>
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
