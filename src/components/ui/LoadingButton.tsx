"use client";

import React from 'react';
import styles from '@/styles/auth.module.css';
import { Spinner } from './spinner';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    loadingText?: string;
    children: React.ReactNode;
}

export default function LoadingButton({ isLoading, loadingText = "Loading...", children, className, disabled, ...props }: LoadingButtonProps) {
    return (
        <button
            type="submit"
            className={`${styles.button} ${className || ''}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <Spinner size={20} color="#ffffff" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    );
}
