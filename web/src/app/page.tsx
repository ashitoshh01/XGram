"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import HeroSlider from "@/components/HeroSlider";
import FilterSection from "@/components/FilterSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <CategoryBar />
      <HeroSlider />

      <div className="container" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', marginLeft: '1rem' }}>
          Trending Materials
        </h2>
      </div>

      <FilterSection />

      <ProductGrid />

      <Footer />
    </main>
  );
}
