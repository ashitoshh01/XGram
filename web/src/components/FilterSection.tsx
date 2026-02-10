"use client";

import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.filterSection}>
            {/* Mobile Toggle Bar */}
            <div className={styles.filterToggleMobile} onClick={() => setIsOpen(!isOpen)}>
                <SlidersHorizontal size={18} />
                <span>Filters</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            <div className={`${styles.filtersContainer} ${isOpen ? styles.openContainer : ''}`}>

                {/* Filter Groups - Collapsible on Mobile */}
                <div className={`${styles.filters} ${isOpen ? styles.open : ''}`}>
                    <div className={styles.filterGroup}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                            <SlidersHorizontal size={18} className="hide-on-mobile" style={{ display: isOpen ? 'none' : 'block' }} />
                            {/* On desktop we show icon, on mobile we hide it inside the list because toggle is outside */}
                            <span className={styles.label} style={{ fontWeight: 600 }}>Refine:</span>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.label}>Price Range</label>
                        <input type="range" className={styles.rangeInput} min="0" max="10000" />
                    </div>

                    <div className={styles.filterGroup}>
                        <select className={styles.select} defaultValue="">
                            <option value="" disabled>Category</option>
                            <option value="rmc">RMC</option>
                            <option value="raw">Raw Materials</option>
                            <option value="cement">Cement</option>
                            <option value="steel">Steel</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <select className={styles.select} defaultValue="">
                            <option value="" disabled>Material Type</option>
                            <option value="type1">Type A</option>
                            <option value="type2">Type B</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <select className={styles.select} defaultValue="">
                            <option value="" disabled>Availability</option>
                            <option value="instock">In Stock</option>
                            <option value="preorder">Pre-Order</option>
                        </select>
                    </div>
                </div>

                {/* Sort Container - Always Visible or Collapsed? Usually Sort is important so keep visible or part of toggle */}
                {/* Let's keep sort always visible on desktop, and collapsible or sticky on mobile */}
                {/* But my CSS hides .filters by default on mobile. Sort is sibling. */}
                {/* In my previous CSS, I didn't hide sortContainer. Let's check. */}
                {/* .filters { display: none } on mobile. .sortContainer not hidden. */}
                {/* So Sort is visible. */}

                <div className={styles.sortContainer}>
                    <span className={styles.label}>Sort by:</span>
                    <select className={styles.select} style={{ minWidth: '180px' }}>
                        <option value="popularity">Popularity</option>
                        <option value="price_low_high">Price: Low → High</option>
                        <option value="price_high_low">Price: High → Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
