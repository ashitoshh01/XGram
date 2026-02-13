"use client";

import React, { useState } from "react";
import styles from "./CategoryBar.module.css";

const CATEGORIES = [
    "All",
    "RMC",
    "Cement",
    "Aggregates",
    "Bricks & Blocks",
    "TMT Steel",
    "Tiles & Flooring",
    "Plumbing",
    "Electrical"
];

interface CategoryBarProps {
    activeCategory?: string;
    onSelectCategory?: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory = "All", onSelectCategory }) => {

    return (
        <div className={styles.categoryBar}>
            <ul className={styles.categoryList}>
                {CATEGORIES.map((category) => (
                    <li
                        key={category}
                        className={`${styles.categoryItem} ${activeCategory === category ? styles.active : ''}`}
                        onClick={() => onSelectCategory?.(category)}
                    >
                        <span className={styles.categoryText} data-text={category}>{category}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryBar;
