"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Mock Data (In a real app, this would be fetched from API)
const PRODUCTS = [
    { id: "1", title: "Premium RMC Grade M25", description: "High-quality Ready Mix Concrete suitable for residential and commercial construction. Features optimized aggregate grading and consistent quality control.", price: "₹4,500 / m³", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", specs: ["Water-Cement Ratio: 0.45", "Slump: 100-120mm", "Compressive Strength: 25 MPa"] },
    { id: "2", title: "Portland Cement 53 Grade", description: "Standard Portland cement ideal for general construction works. Fast setting and high early strength.", price: "₹380 / bag", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" },
    // ... add more or fetch dynamically
];

const ProductDetail = () => {
    const { id } = useParams();

    // Find product or fallback to first one for demo if not found in mock list
    const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
    const [quantity, setQuantity] = useState(1);

    return (
        <main className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
            {/* Back Button */}
            <div style={{ marginBottom: '1.5rem' }}>
                <Link
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        width: 'fit-content'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <ChevronLeft size={20} />
                    Back to Products
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                {/* Left: Image Gallery */}
                <div style={{ flex: 1, minWidth: '350px' }}>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: 'var(--bg-secondary)',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Right: Details */}
                <div style={{ flex: 1, minWidth: '350px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.2' }}>{product.title}</h1>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1.5rem' }}>{product.price}</p>

                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: '2.5rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Product Specifications:</h3>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                            {product.specs?.map((spec, i) => (
                                <li key={i}>{spec}</li>
                            )) || (
                                    <>
                                        <li>High Durability & Strength</li>
                                        <li>Industry Standard Compliance (ISI)</li>
                                        <li>Quality Verified by XGram</li>
                                    </>
                                )}
                        </ul>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'white' }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{ padding: '0.6rem 1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}
                            >-</button>
                            <span style={{ padding: '0.6rem 1rem', fontWeight: 600, minWidth: '3rem', textAlign: 'center' }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                style={{ padding: '0.6rem 1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}
                            >+</button>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', flex: 1 }}>
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
