"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Privacy Policy</h1>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Your privacy is important to us. It is XGram&apos;s policy to respect your privacy regarding any information we may collect from you across our website, http://xgram.com, and other sites we own and operate.
                </p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem' }}>1. Data Collection</h2>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
                </p>
            </div>
            <Footer />
        </main>
    );
};

export default Privacy;
