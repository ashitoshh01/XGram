"use client";

import React, { useState, useEffect } from "react";
import styles from "./Loader.module.css";

const Loader = ({ onFinish }: { onFinish: () => void }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 1500);
        const remove = setTimeout(() => onFinish(), 2000);
        return () => {
            clearTimeout(timer);
            clearTimeout(remove);
        };
    }, [onFinish]);

    return (
        <div className={`${styles.loader} ${fadeOut ? styles.fadeOut : ""}`}>
            <span className={styles.text}>
                Loading
                <span className={styles.dots}>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                </span>
            </span>
        </div>
    );
};

export default Loader;
