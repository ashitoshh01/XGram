"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const { user, updateUserProfile } = useAuth();
    const router = useRouter();

    const [name, setName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // 10 distinct preset avatars (4 girls, 6 boys) using DiceBear api
    const presetAvatars = [
        "https://api.dicebear.com/7.x/notionists/svg?seed=Mia",   // Girl 1
        "https://api.dicebear.com/7.x/notionists/svg?seed=Lily",  // Girl 2
        "https://api.dicebear.com/7.x/notionists/svg?seed=Chloe", // Girl 3
        "https://api.dicebear.com/7.x/notionists/svg?seed=Zoey",  // Girl 4
        "https://api.dicebear.com/7.x/notionists/svg?seed=Alex",  // Boy 1
        "https://api.dicebear.com/7.x/notionists/svg?seed=Sam",   // Boy 2
        "https://api.dicebear.com/7.x/notionists/svg?seed=Ryan",  // Boy 3
        "https://api.dicebear.com/7.x/notionists/svg?seed=Jake",  // Boy 4
        "https://api.dicebear.com/7.x/notionists/svg?seed=Leo",   // Boy 5
        "https://api.dicebear.com/7.x/notionists/svg?seed=Max",   // Boy 6
    ];

    useEffect(() => {
        if (user) {
            setName(user.name);
            setSelectedAvatar(user.photoURL || "");
        } else {
            // Not authenticated natively redirects, but just safely handle loading state
            router.push("/login");
        }
    }, [user, router]);

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For production, upload this to Firebase Storage and get URL.
            // For now, we limit it to local Object URL to demonstrate functionality
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image must be less than 2MB");
                return;
            }
            const localUrl = URL.createObjectURL(file);
            setSelectedAvatar(localUrl);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await updateUserProfile(name, selectedAvatar);
            // Internal toast triggered by updateUserProfile
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: '2rem 1rem' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Your Account</h1>
                    <p>Manage your personal details and avatar.</p>
                </div>

                <form onSubmit={handleSave}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" className={styles.input} value={user.email} disabled title="You cannot change your email address" />
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>The email address associated with your account cannot be changed.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.avatarSection}>
                        <label>Select an Avatar</label>
                        <div className={styles.avatarGrid}>
                            {presetAvatars.map((url, i) => (
                                <div
                                    key={i}
                                    className={`${styles.avatarCard} ${selectedAvatar === url ? styles.selected : ""}`}
                                    onClick={() => setSelectedAvatar(url)}
                                >
                                    <img src={url} alt={`Avatar ${i + 1}`} className={styles.avatarImg} />
                                </div>
                            ))}
                        </div>

                        <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                            <label>Or Upload Custom Avatar</label>
                            <label htmlFor="custom-avatar-upload" className={styles.customFileUpload}>
                                Choose File
                            </label>
                            <input
                                id="custom-avatar-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarUpload}
                            />
                            {selectedAvatar && !presetAvatars.includes(selectedAvatar) && (
                                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Current Selection:</span>
                                    <img src={selectedAvatar} alt="Custom Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" className={`btn btn-primary ${styles.saveBtn}`} disabled={isSaving}>
                        {isSaving ? "Saving Changes..." : "Save Account Settings"}
                    </button>
                </form>
            </div>
        </div>
    );
}
