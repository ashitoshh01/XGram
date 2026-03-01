"use client";

import Image from "next/image";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";

const ProductDetail = () => {
    const { id } = useParams();

    // Find product or fallback to first one for demo if not found in mock list
    // Use type assertion or find correctly typed
    const product = (PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]) as Product;
    const [quantity, setQuantity] = useState(1);

    const handleRequestQuote = () => {
        const message = `Hi, I would like to request a quote for:

*Product*: ${product.title}
*Quantity*: ${quantity} ${product.unit || ''}
*Price*: ₹${product.price} / ${product.unit || ''}
*Details*: ${product.description}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919604019444?text=${encodedMessage}`, '_blank');
    };

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
                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: 'var(--bg-secondary)',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 500px"
                        />
                    </div>
                </div>

                {/* Right: Details */}
                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.3' }}>{product.title}</h1>
                    <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1.5rem' }}>₹{product.price} / {product.unit}</p>

                    <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: '2.5rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Product Specifications:</h3>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
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
                                style={{ padding: '0.6rem 1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}
                            >-</button>
                            <span style={{ padding: '0.6rem 1rem', fontWeight: 600, minWidth: '3rem', textAlign: 'center', fontSize: '0.95rem' }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                style={{ padding: '0.6rem 1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}
                            >+</button>
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ padding: '0.8rem 2.5rem', fontSize: '0.95rem', flex: 1 }}
                            onClick={handleRequestQuote}
                        >
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
