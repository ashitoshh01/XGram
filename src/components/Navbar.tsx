"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleProfileClick = () => {
        if (isAuthenticated) {
            router.push("/profile");
        } else {
            router.push("/login");
        }
    };

    return (
        <>
            <nav
                className={styles.navbar}
                style={{
                    boxShadow: scrolled ? "var(--shadow-md)" : "none",
                    borderBottomColor: scrolled
                        ? "rgba(226,232,240,0.8)"
                        : "rgba(226,232,240,0.4)",
                }}
            >
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo-new.png"
                        alt="XGram Logo"
                        width={180}
                        height={60}
                        style={{
                            objectFit: "contain",
                            height: "46px",
                            width: "auto",
                        }}
                        priority
                        unoptimized
                    />
                </Link>

                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search materials, brands, categories..."
                        className={styles.searchInput}
                    />
                    <Search className={styles.searchIcon} size={17} />
                </div>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <Link href="/" className={styles.navItem}>
                        Home
                    </Link>
                    <Link href="/about" className={styles.navItem}>
                        About
                    </Link>
                    <Link href="/contact" className={styles.navItem}>
                        Contact
                    </Link>

                    <div className={styles.actions}>
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="btn btn-outline"
                                    style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push("/signup")}
                                    className="btn btn-primary"
                                    style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                                <div className={styles.userAvatar}>
                                    {user?.name ? (
                                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    ) : (
                                        <User size={18} color="var(--text-secondary)" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hamburger Icon for Mobile - right side */}
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <Menu size={22} />
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ""}`}
                onClick={toggleMenu}
            />

            {/* Mobile Sidebar Menu */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                    }}
                >
                    <Image
                        src="/logo-new.png"
                        alt="XGram"
                        width={120}
                        height={40}
                        style={{ objectFit: "contain", height: "32px", width: "auto" }}
                        unoptimized
                    />
                    <div className={styles.closeBtn} onClick={toggleMenu}>
                        <X size={20} />
                    </div>
                </div>

                {/* Mobile Search */}
                <div style={{ position: "relative", marginBottom: "0.5rem" }}>
                    <input
                        type="text"
                        placeholder="Search XGram..."
                        style={{
                            width: "100%",
                            padding: "0.75rem 2.5rem 0.75rem 1rem",
                            borderRadius: "100px",
                            border: "1.5px solid var(--border)",
                            backgroundColor: "var(--bg-secondary)",
                            fontSize: "0.95rem",
                            fontFamily: "var(--font-body)",
                            outline: "none",
                            transition: "all 0.2s ease",
                        }}
                    />
                    <Search
                        size={16}
                        style={{
                            position: "absolute",
                            right: "0.8rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--text-muted)",
                        }}
                    />
                </div>

                <Link href="/" className={styles.navItem} onClick={toggleMenu}>
                    Home
                </Link>
                <Link href="/about" className={styles.navItem} onClick={toggleMenu}>
                    About Us
                </Link>
                <Link href="/contact" className={styles.navItem} onClick={toggleMenu}>
                    Contact Us
                </Link>
                <Link href="/terms" className={styles.navItem} onClick={toggleMenu}>
                    Terms
                </Link>

                <div className={styles.actions} style={{ marginTop: "auto" }}>
                    {!isAuthenticated ? (
                        <>
                            <button
                                onClick={() => {
                                    router.push("/login");
                                    toggleMenu();
                                }}
                                className="btn btn-outline"
                                style={{ width: "100%", padding: "0.75rem", marginBottom: "0.75rem" }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    router.push("/signup");
                                    toggleMenu();
                                }}
                                className="btn btn-primary"
                                style={{ width: "100%", padding: "0.75rem" }}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                handleProfileClick();
                                toggleMenu();
                            }}
                            className="btn btn-primary"
                            style={{ width: "100%", padding: "0.75rem" }}
                        >
                            My Profile
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
