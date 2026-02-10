"use client";

import React, { useState } from "react";
import styles from "./ProductGrid.module.css";
import ProductCard from "./ProductCard";

const INITIAL_PRODUCTS = [
    { id: "1", title: "Premium RMC Grade M25", description: "High-quality Ready Mix Concrete suitable for residential and commercial construction.", price: "₹4,500 / m³", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" },
    { id: "2", title: "Portland Cement 53 Grade", description: "Standard Portland cement ideal for general construction works.", price: "₹380 / bag", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" },
    { id: "3", title: "TMT Steel Bars", description: "Corrosion-resistant TMT steel bars for strong structural support.", price: "₹65,000 / ton", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop" },
    { id: "4", title: "Red Clay Bricks", description: "Traditional red clay bricks, burnt for durability and strength.", price: "₹8 / piece", image: "https://images.unsplash.com/photo-1588011930968-7e390c9b6343?q=80&w=2070&auto=format&fit=crop" },
    { id: "5", title: "Vitrified Floor Tiles", description: "Premium vitrified tiles for elegant flooring solutions.", price: "₹45 / sq.ft", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop" },
    { id: "6", title: "Building Sand", description: "Clean river sand for plastering and concrete mixing.", price: "₹3,200 / ton", image: "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?q=80&w=2070&auto=format&fit=crop" },
];

const MORE_PRODUCTS = [
    { id: "7", title: "Granite Aggregate 20mm", description: "Crushed granite aggregate for concrete works.", price: "₹850 / ton", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop" },
    { id: "8", title: "AAC Blocks", description: "Lightweight Autoclaved Aerated Concrete blocks.", price: "₹3,500 / m³", image: "https://images.unsplash.com/photo-1590059390492-d54d5b789973?q=80&w=2070&auto=format&fit=crop" },
];

const ProductGrid = () => {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        // Simulate loading
        setTimeout(() => {
            setProducts([...products, ...MORE_PRODUCTS]);
            setHasMore(false); // For demo, just one load
        }, 500);
    };

    return (
        <>
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        imageUrl={product.image}
                    />
                ))}
            </div>

            {hasMore && (
                <div className={styles.loadMoreContainer}>
                    <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                        Show More Items
                    </button>
                </div>
            )}
        </>
    );
};

export default ProductGrid;
