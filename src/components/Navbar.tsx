"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X, Settings, AlertCircle, LogOut } from "lucide-react";
import styles from "./Navbar.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery.trim())}#trending-section`);
            setIsMenuOpen(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

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
            if (window.confirm("Do you want to sign out?")) {
                logout();
            }
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Search className={styles.searchIcon} size={17} onClick={handleSearch} style={{ cursor: 'pointer' }} />
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
                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer' }}>
                                    <div className={styles.userAvatar} style={{ padding: user?.photoURL ? 0 : '', overflow: 'hidden' }}>
                                        {user?.photoURL ? (
                                            <Image src={user.photoURL} alt="User Avatar" width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                                        ) : user?.name ? (
                                            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        ) : (
                                            <User size={18} color="var(--text-secondary)" />
                                        )}
                                    </div>
                                </div>

                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '120%',
                                        right: 0,
                                        width: '220px',
                                        backgroundColor: '#ffffff',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                        border: '1px solid var(--border)',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.25rem',
                                        zIndex: 50
                                    }}>
                                        <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.25rem' }}>
                                            <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0, color: 'var(--text-primary)' }}>{user?.name || "User"}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, wordBreak: 'break-all', marginTop: '0.2rem' }}>{user?.email}</p>
                                        </div>
                                        <button onClick={() => { setIsDropdownOpen(false); router.push("/account"); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-primary)' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <User size={16} /> Your Account
                                        </button>
                                        <button onClick={() => { setIsDropdownOpen(false); router.push("/settings"); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-primary)' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <Settings size={16} /> Settings
                                        </button>
                                        <button onClick={() => { setIsDropdownOpen(false); router.push("/report-issue"); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-primary)' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <AlertCircle size={16} /> Report Issue
                                        </button>
                                        <button onClick={() => { setIsDropdownOpen(false); logout(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', color: '#e53e3e' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
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
                        onClick={handleSearch}
                        style={{
                            position: "absolute",
                            right: "0.8rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--text-muted)",
                            cursor: "pointer",
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

                <div className={styles.actions} style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
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
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
