"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if we are done loading and user is NOT authenticated
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    // Show loading state while checking auth status
    if (isLoading) {
        return (
            <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading profile...</p>
            </div>
        );
    }

    // If not authenticated (and redirect is pending), return null preventing flash of content
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>My Profile</h1>
                    <button onClick={logout} className={styles.logoutButton}>
                        Sign Out
                    </button>
                </div>

                <div className={styles.card}>
                    <div className={styles.section}>
                        <div className={styles.label}>Full Name</div>
                        <div className={styles.value}>{user.name}</div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.label}>Email Address</div>
                        <div className={styles.value}>{user.email}</div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.label}>Account Role</div>
                        <div className={styles.value} style={{ textTransform: "capitalize" }}>
                            {user.role}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
