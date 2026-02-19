"use client";

import React, { useState, useEffect } from "react";
import styles from "./Loader.module.css";

import { Spinner } from "./ui/spinner";

const Loader = ({ onFinish }: { onFinish: () => void }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Increase duration slightly for the new animation to be appreciated
        const timer = setTimeout(() => setFadeOut(true), 2500);
        const remove = setTimeout(() => onFinish(), 3000);
        return () => {
            clearTimeout(timer);
            clearTimeout(remove);
        };
    }, [onFinish]);

    return (
        <div className={`${styles.loader} ${fadeOut ? styles.fadeOut : ""}`}>
            <Spinner size={60} color="#00A2F1" />
        </div>
    );
};

export default Loader;
