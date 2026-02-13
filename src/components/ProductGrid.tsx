"use client";

import React, { useState } from "react";
import styles from "./ProductGrid.module.css";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: any[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const [visibleCount, setVisibleCount] = useState(8);

    React.useEffect(() => {
        const handleResize = () => {
            // Mobile breakpoint usually 768px
            if (window.innerWidth < 768) {
                setVisibleCount(prev => prev === products.length ? prev : 5);
            } else {
                setVisibleCount(prev => prev === products.length ? prev : 8);
            }
        };

        // Set initial
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [products.length]); // Re-run if total products change? or just once. 
    // Actually simplicity: just check on mount. If user resizes, we might not want to reset if they already clicked show more.
    // The requirement says "on mobile 1st 5 should be visible". It implies initial state.

    // Better implementation for "Show More":
    // 1. Initialize with a default (e.g. 8).
    // 2. In useEffect, setting it to 5 if mobile.
    // 3. If user clicks "Show More", set to products.length.

    React.useEffect(() => {
        if (window.innerWidth < 768) {
            setVisibleCount(5);
        } else {
            setVisibleCount(8);
        }
    }, []);

    const handleShowMore = () => {
        setVisibleCount(products.length);
    };

    const displayedProducts = products.slice(0, visibleCount);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
            <div className={styles.productGrid}>
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            price={`₹${product.price} / ${product.unit}`}
                            imageUrl={product.image}
                        />
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', width: '100%', gridColumn: '1 / -1' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>No products found matching your criteria.</p>
                    </div>
                )}
            </div>

            {visibleCount < products.length && products.length > 0 && (
                <button
                    onClick={handleShowMore}
                    className="btn btn-primary"
                    style={{ marginTop: '2.5rem', minWidth: '150px' }}
                >
                    Show More
                </button>
            )}
        </div>
    );
};

export default ProductGrid;
