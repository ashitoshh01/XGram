"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

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
        <main>
            <Navbar />

            {/* Breadcrumb */}
            <div className="container" style={{ padding: '1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Home <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                Products <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{product.title}</span>
            </div>

            <div className="container" style={{ display: 'flex', gap: '3rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {/* Left: Image Gallery */}
                <div style={{ flex: 1, minWidth: '350px' }}>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: 'var(--bg-secondary)'
                    }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: '1px solid var(--border)'
                            }}>
                                <img
                                    src={product.image}
                                    alt={`Thumbnail ${i}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Details */}
                <div style={{ flex: 1, minWidth: '350px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>{product.title}</h1>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>{product.price}</p>

                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Specifications:</h3>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                            {product.specs?.map((spec, i) => (
                                <li key={i} style={{ marginBottom: '0.3rem' }}>{spec}</li>
                            )) || (
                                    <>
                                        <li>High Durability</li>
                                        <li>Industry Standard Compliance</li>
                                        <li>Quality Verified</li>
                                    </>
                                )}
                        </ul>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{ padding: '0.5rem 1rem', fontSize: '1.2rem' }}
                            >-</button>
                            <span style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                style={{ padding: '0.5rem 1rem', fontSize: '1.2rem' }}
                            >+</button>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}>
                            Get Quote / Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default ProductDetail;
