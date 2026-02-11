"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Terms & Conditions</h1>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Welcome to XGram. These terms and conditions outline the rules and regulations for the use of XGram&apos;s Website.
                </p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h2>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use XGram if you do not agree to take all of the terms and conditions stated on this page.
                </p>
            </div>
            <Footer />
        </main>
    );
};

export default Terms;
