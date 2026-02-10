"use client";

import React, { useState } from "react";
import styles from "./CategoryBar.module.css";

const CATEGORIES = [
    "RMC",
    "Cement",
    "Aggregates",
    "Bricks & Blocks",
    "TMT Steel",
    "Tiles & Flooring",
    "Plumbing",
    "Electrical"
];

const CategoryBar = () => {
    const [activeCategory, setActiveCategory] = useState("RMC");

    return (
        <div className={styles.categoryBar}>
            <ul className={styles.categoryList}>
                {CATEGORIES.map((category) => (
                    <li
                        key={category}
                        className={`${styles.categoryItem} ${activeCategory === category ? styles.active : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryBar;
