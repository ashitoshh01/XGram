"use client";

import React, { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import HeroSlider from "@/components/HeroSlider";
import FilterSection from "@/components/FilterSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderFinish = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader onFinish={handleLoaderFinish} />}

      <main className={styles.mainContent} style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <Navbar />
        <CategoryBar />
        <HeroSlider />

        <div className="container" style={{ marginTop: '2.5rem' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>🔥 Hot</div>
            <h2 className={styles.sectionTitle}>
              Trending Materials
            </h2>
            <p className={styles.sectionSubtitle}>
              Most popular construction materials this week
            </p>
          </div>
        </div>

        <FilterSection />

        <ProductGrid />

        <Footer />
      </main>
    </>
  );
}
