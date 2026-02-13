
"use client";

import React from "react";
import styles from "./KineticDotsLoader.module.css";

export default function KineticDotsLoader() {
    const dots = 4; // Increased to 4 for better rhythm

    return (
        <div className={styles.container}>
            <div className={styles.dotsContainer}>
                {[...Array(dots)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.dotColumn}
                    >
                        {/* 1. THE BOUNCING DOT */}
                        <div
                            className={styles.dotWrapper}
                            style={{
                                animationDelay: `${i * 0.15}s`,
                            }}
                        >
                            <div
                                className={styles.dot}
                                style={{
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />

                            {/* Specular highlight for liquid look */}
                            <div className={styles.highlight} />
                        </div>

                        {/* 2. FLOOR RIPPLE (Shockwave on impact) */}
                        <div
                            className={styles.ripple}
                            style={{
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />

                        {/* 3. REFLECTIVE SHADOW */}
                        <div
                            className={styles.shadow}
                            style={{
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
