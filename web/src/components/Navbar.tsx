"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import React, { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className={styles.navbar}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Hamburger Icon for Mobile - Only visible on small screens via CSS */}
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        <Menu size={24} />
                    </div>

                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/logo.png"
                            alt="XGram Logo"
                            width={180}
                            height={60}
                            style={{ objectFit: 'contain', height: '50px', width: 'auto' }}
                            priority
                            unoptimized
                        />
                    </Link>
                </div>

                {/* Search Bar - hidden on very small screens in CSS */}
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search for materials, brands, categories..."
                        className={styles.searchInput}
                    />
                </div>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <Link href="/" className={styles.navItem}>Home</Link>
                    <Link href="/about" className={styles.navItem}>About Us</Link>
                    <Link href="/contact" className={styles.navItem}>Contact Us</Link>

                    <div className={styles.actions}>
                        <button className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>Login</button>
                        <button className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>Sign Up</button>
                        <Link href="/profile" style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
                            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '50%' }}>
                                <User size={20} color="var(--text-secondary)" />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu} />

            {/* Mobile Sidebar Menu */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <X size={24} onClick={toggleMenu} style={{ cursor: 'pointer' }} />
                </div>

                {/* Mobile Search */}
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search XGram..."
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem 0.8rem 2.5rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-secondary)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                <Link href="/" className={styles.navItem} onClick={toggleMenu}>Home</Link>
                <Link href="/about" className={styles.navItem} onClick={toggleMenu}>About Us</Link>
                <Link href="/contact" className={styles.navItem} onClick={toggleMenu}>Contact Us</Link>
                <Link href="/terms" className={styles.navItem} onClick={toggleMenu}>Terms</Link>

                <div className={styles.actions} style={{ marginTop: 'auto' }}>
                    <button className="btn btn-outline" style={{ width: '100%', padding: '0.8rem' }}>Login</button>
                    <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>Sign Up</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
