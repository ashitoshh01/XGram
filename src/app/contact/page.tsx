"use client";

import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;
        setIsLoading(true);
        setStatusMessage({ text: "", type: "" });

        try {
            // Note for User: These are temporary demo credentials. 
            // You will need to create a free account at EmailJS.com and swap these with yours
            // specifically your: SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY
            await emailjs.sendForm(
                'YOUR_SERVICE_ID_HERE',
                'YOUR_TEMPLATE_ID_HERE',
                formRef.current,
                'YOUR_PUBLIC_KEY_HERE'
            );

            setStatusMessage({ text: "Success! Your message has been sent to our team.", type: "success" });
            formRef.current.reset();
        } catch (error) {
            console.error("Failed to send email:", error);
            setStatusMessage({ text: "Failed to send message. Please try again later.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <div className="container" style={{ padding: '4rem 2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary)' }}>Contact Us</h1>

                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Get in Touch</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email: support@xgram.com</p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Phone: +91 99999 88888</p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Address: 123 Construction Hub, Navi Mumbai, India</p>
                    </div>

                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Send us a Message</h3>

                        {statusMessage.text && (
                            <div style={{
                                padding: '1rem',
                                marginBottom: '1rem',
                                borderRadius: 'var(--radius)',
                                backgroundColor: statusMessage.type === 'success' ? '#e6f4fa' : '#fee2e2',
                                color: statusMessage.type === 'success' ? 'var(--blue-700)' : '#991b1b',
                                border: statusMessage.type === 'success' ? '1px solid var(--blue-200)' : '1px solid #f87171'
                            }}>
                                {statusMessage.text}
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Your Name"
                                required
                                style={{
                                    padding: '0.8rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem'
                                }}
                            />
                            <input
                                type="email"
                                name="user_email"
                                placeholder="Your Email"
                                required
                                style={{
                                    padding: '0.8rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem'
                                }}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={5}
                                required
                                style={{
                                    padding: '0.8rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary"
                                style={{
                                    alignSelf: 'flex-start',
                                    padding: '0.8rem 2rem',
                                    opacity: isLoading ? 0.7 : 1,
                                    cursor: isLoading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
