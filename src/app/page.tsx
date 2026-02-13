"use client";

import React, { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import CategoryBar from "@/components/CategoryBar";
import HeroSlider from "@/components/HeroSlider";
import FilterSection from "@/components/FilterSection";
import ProductGrid from "@/components/ProductGrid";
import styles from "./page.module.css";


import { PRODUCTS } from "@/data/products";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState({
    priceRange: 100000,
    materialType: "All",
    availability: "All",
    sort: "popularity",
    category: "All"
  });

  // Sync selectedCategory (from Bar) with filters.category
  React.useEffect(() => {
    setFilters(prev => ({ ...prev, category: selectedCategory }));
  }, [selectedCategory]);

  const handleLoaderFinish = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const section = document.getElementById('trending-section');
    if (section) {
      const yOffset = -180;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'category') {
      setSelectedCategory(value);
    }
  };

  const filteredProducts = PRODUCTS.filter(product => {
    if (filters.category !== "All" && product.category !== filters.category) return false;
    if (parseInt(product.price) > filters.priceRange) return false;
    if (filters.materialType !== "All" && product.materialType !== filters.materialType) return false;
    if (filters.availability !== "All" && product.availability !== filters.availability) return false;
    return true;
  }).sort((a, b) => {
    const priceA = parseInt(a.price);
    const priceB = parseInt(b.price);
    if (filters.sort === "price_low_high") return priceA - priceB;
    if (filters.sort === "price_high_low") return priceB - priceA;
    return 0;
  });

  return (
    <>
      {isLoading && <Loader onFinish={handleLoaderFinish} />}

      <main className={styles.mainContent} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <CategoryBar
          activeCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <HeroSlider />

        <div id="trending-section" className="container" style={{ marginTop: '2.5rem' }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Trending Materials
            </h2>
            <p className={styles.sectionSubtitle}>
              Most popular construction materials this week
            </p>
          </div>
        </div>

        <FilterSection filters={filters} onFilterChange={handleFilterChange} />

        <ProductGrid products={filteredProducts} />
      </main>
    </>
  );
}
