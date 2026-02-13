"use client";

import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
    filters: {
        priceRange: number;
        materialType: string;
        availability: string;
        sort: string;
        category: string;
    };
    onFilterChange: (key: string, value: any) => void;
}

interface CustomSelectProps {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    placeholder: string;
    minWidth?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange, placeholder, minWidth = "150px" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={styles.customSelectWrapper} ref={ref} style={{ minWidth }}>
            <div
                className={`${styles.customSelectTrigger} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles.selectedValue}>
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDown size={14} className={`${styles.selectIcon} ${isOpen ? styles.rotate : ''}`} />
            </div>

            <div className={`${styles.customOptions} ${isOpen ? styles.show : ''}`}>
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`${styles.customOption} ${option.value === value ? styles.selected : ''}`}
                        onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                    >
                        <span>{option.label}</span>
                        {option.value === value && <div className={styles.selectedDot} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange('priceRange', parseInt(e.target.value));
    };

    return (
        <div className={styles.filterSection}>
            {/* Mobile Toggle Bar */}
            <div className={styles.filterToggleMobile} onClick={() => setIsOpen(!isOpen)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <SlidersHorizontal size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Refine</span>
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            <div className={`${styles.filtersContainer} ${isOpen ? styles.openContainer : ''}`}>

                {/* Filter Groups */}
                <div className={`${styles.filters} ${isOpen ? styles.open : ''}`}>
                    <div className={styles.filterGroup}>
                        <div className={styles.refineLabel}>
                            <SlidersHorizontal size={18} />
                            <span>Refine:</span>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.label}>Price Range</label>
                        <div className={styles.rangeWrapper}>
                            <input
                                type="range"
                                className={styles.rangeInput}
                                min="0"
                                max="100000"
                                step="100"
                                value={filters.priceRange}
                                onChange={handleRangeChange}
                                style={{
                                    background: `linear-gradient(to right, var(--primary) ${(filters.priceRange / 100000) * 100}%, #e2e8f0 ${(filters.priceRange / 100000) * 100}%)`
                                }}
                            />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '60px' }}>
                                ₹{filters.priceRange.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <CustomSelect
                            value={filters.category}
                            onChange={(val) => onFilterChange('category', val)}
                            placeholder="Category"
                            options={[
                                { value: "All", label: "All Categories" },
                                { value: "RMC", label: "RMC" },
                                { value: "Cement", label: "Cement" },
                                { value: "Aggregates", label: "Aggregates" },
                                { value: "Bricks & Blocks", label: "Bricks & Blocks" },
                                { value: "TMT Steel", label: "TMT Steel" }
                            ]}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <CustomSelect
                            value={filters.materialType}
                            onChange={(val) => onFilterChange('materialType', val)}
                            placeholder="Material Type"
                            options={[
                                { value: "All", label: "Material Type" },
                                { value: "Concrete", label: "Concrete" },
                                { value: "Binder", label: "Binder" },
                                { value: "Steel", label: "Steel" },
                                { value: "Brick", label: "Brick" },
                                { value: "Sand", label: "Sand" }
                            ]}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <CustomSelect
                            value={filters.availability}
                            onChange={(val) => onFilterChange('availability', val)}
                            placeholder="Availability"
                            options={[
                                { value: "All", label: "Availability" },
                                { value: "In Stock", label: "In Stock" },
                                { value: "Pre-Order", label: "Pre-Order" }
                            ]}
                        />
                    </div>
                </div>

                <div className={styles.sortContainer}>
                    <span className={styles.label}>Sort by:</span>
                    <CustomSelect
                        value={filters.sort}
                        onChange={(val) => onFilterChange('sort', val)}
                        placeholder="Sort By"
                        minWidth="170px"
                        options={[
                            { value: "popularity", label: "Popularity" },
                            { value: "price_low_high", label: "Price: Low → High" },
                            { value: "price_high_low", label: "Price: High → Low" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
