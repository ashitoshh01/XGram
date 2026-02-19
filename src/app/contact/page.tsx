"use client";

const Contact = () => {
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
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                style={{
                                    padding: '0.8rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem'
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                style={{
                                    padding: '0.8rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem'
                                }}
                            />
                            <textarea
                                placeholder="Message"
                                rows={5}
                                style={{
                                    padding: '0.8rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            ></textarea>
                            <button
                                className="btn btn-primary"
                                style={{ alignSelf: 'flex-start', padding: '0.8rem 2rem' }}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
