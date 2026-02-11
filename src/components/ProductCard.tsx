"use client";

import React from "react";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, description, price, imageUrl }) => {
    return (
        <Link href={`/product/${id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    unoptimized
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>{price}</span>
                    <span className={styles.cta}>Get Quote</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
