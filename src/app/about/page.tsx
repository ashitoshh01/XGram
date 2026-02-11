"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)' }}>About XGram</h1>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                    Welcome to XGram, your premier B2B marketplace for high-quality construction materials.
                    Inspired by industry leaders, we aim to streamline the procurement process for developers, contractors, and builders.
                    <br /><br />
                    Our mission is to provide transparent pricing, reliable delivery, and top-tier customer service
                    for all your construction needs—from RMC and steel to electricals and plumbing.
                </p>
            </div>
            <Footer />
        </main>
    );
};

export default About;
