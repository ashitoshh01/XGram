"use client";

import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/logo.png"
                            alt="XGram Logo"
                            width={200}
                            height={70}
                            style={{ objectFit: 'contain', height: '60px', width: 'auto', marginBottom: '1rem', background: 'white', padding: '0.4rem', borderRadius: '4px' }}
                            unoptimized
                        />
                    </Link>
                    <p className={styles.description}>
                        Your premium B2B construction materials marketplace. High-quality RMC, aggregate, steel, and more, delivered directly to your site.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', color: '#94a3b8' }}>
                        <Facebook size={20} className={styles.link} />
                        <Twitter size={20} className={styles.link} />
                        <Instagram size={20} className={styles.link} />
                        <Linkedin size={20} className={styles.link} />
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Categories</h4>
                    <ul className={styles.links}>
                        <li className={styles.link}>Ready Mix Concrete</li>
                        <li className={styles.link}>Raw Materials</li>
                        <li className={styles.link}>TMT Steel</li>
                        <li className={styles.link}>Cement</li>
                        <li className={styles.link}>Bricks & Blocks</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Company</h4>
                    <ul className={styles.links}>
                        <Link href="/about" className={styles.link}>About Us</Link>
                        <Link href="/contact" className={styles.link}>Contact Us</Link>
                        <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
                        <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                        <Link href="/careers" className={styles.link}>Careers</Link>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Support</h4>
                    <ul className={styles.links}>
                        <li className={styles.link}>Help Center</li>
                        <li className={styles.link}>Shipping Policy</li>
                        <li className={styles.link}>Returns & Refunds</li>
                        <li className={styles.link}>FAQ</li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>Copyright © {new Date().getFullYear()} XGram Construction. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
