"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: false,
        newsletters: true,
        twoFactor: false,
        publicProfile: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleSave = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 800)),
            {
                loading: 'Saving preferences...',
                success: 'Settings updated successfully!',
                error: 'Could not update settings.',
            }
        );
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: '2rem 1rem' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Settings</h1>
                    <p>Manage your platform preferences and notification settings.</p>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Notifications</h3>
                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <span className={styles.toggleTitle}>Order Updates</span>
                            <span className={styles.toggleDesc}>Receive SMS and email notifications regarding your orders.</span>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={settings.orderUpdates} onChange={() => handleToggle('orderUpdates')} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <span className={styles.toggleTitle}>Promotional Emails</span>
                            <span className={styles.toggleDesc}>Get notified about special deals and discounts on bulk materials.</span>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={settings.promotions} onChange={() => handleToggle('promotions')} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <span className={styles.toggleTitle}>Monthly Newsletter</span>
                            <span className={styles.toggleDesc}>Receive the industry news and Xgram updates every month.</span>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={settings.newsletters} onChange={() => handleToggle('newsletters')} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Privacy & Security</h3>
                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <span className={styles.toggleTitle}>Two-Factor Authentication</span>
                            <span className={styles.toggleDesc}>Require an extra security code when logging in.</span>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={settings.twoFactor} onChange={() => handleToggle('twoFactor')} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <span className={styles.toggleTitle}>Public Profile</span>
                            <span className={styles.toggleDesc}>Allow suppliers to view your basic profile details when negotiating.</span>
                        </div>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={settings.publicProfile} onChange={() => handleToggle('publicProfile')} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <button onClick={handleSave} className={`btn btn-primary ${styles.saveBtn}`}>
                    Save Preferences
                </button>
            </div>
        </div>
    );
}
