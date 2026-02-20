"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CategoryBar.module.css";

type Category = {
    name: string;
    subCategories?: string[];
};

const CATEGORIES: Category[] = [
    { name: "All" },
    { name: "Gov. Tender", subCategories: ["Municipality", "Central", "State"] },
    { name: "Cement" },
    { name: "Glass" },
    { name: "Brick and Blocks" },
    { name: "TML Steel" },
    { name: "Tiles and Flooring" },
    { name: "Plumbing" },
    { name: "Electrical/Lighting" },
    { name: "Windows" },
    { name: "Doors" },
    { name: "Hardware/Kitchen" },
    { name: "Aggregates" }
];

interface CategoryBarProps {
    activeCategory?: string;
    onSelectCategory?: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory = "All", onSelectCategory }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategoryClick = (categoryName: string, hasSub: boolean, e: React.MouseEvent) => {
        if (hasSub) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 8, // 8px below the item
                left: rect.left + rect.width / 2
            });
            setOpenDropdown(openDropdown === categoryName ? null : categoryName);
        } else {
            onSelectCategory?.(categoryName);
            setOpenDropdown(null);
        }
    };

    const handleSubCategoryClick = (subCategory: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectCategory?.(`Gov. Tender - ${subCategory}`);
        setOpenDropdown(null);
    };

    return (
        <div className={styles.categoryBar}>
            <ul className={styles.categoryList}>
                {CATEGORIES.map((category) => {
                    const hasSub = !!category.subCategories;
                    const isActive = activeCategory === category.name || activeCategory?.startsWith(`${category.name} -`);

                    return (
                        <li
                            key={category.name}
                            className={`${styles.categoryItem} ${isActive && !hasSub ? styles.active : ''} ${hasSub ? styles.hasDropdown : ''}`}
                            onClick={(e) => handleCategoryClick(category.name, hasSub, e)}
                        >
                            <span className={styles.categoryText}>
                                {category.name}
                                {hasSub && <span className={styles.dropdownIcon}>▼</span>}
                            </span>
                        </li>
                    );
                })}
            </ul>

            {openDropdown === "Gov. Tender" && (
                <ul
                    className={styles.dropdownMenu}
                    ref={dropdownRef}
                    style={{
                        position: 'fixed',
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    {CATEGORIES.find(c => c.name === "Gov. Tender")?.subCategories?.map(sub => (
                        <li
                            key={sub}
                            className={`${styles.dropdownItem} ${activeCategory === `Gov. Tender - ${sub}` ? styles.activeSub : ''}`}
                            onClick={(e) => handleSubCategoryClick(sub, e)}
                        >
                            {sub}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryBar;
