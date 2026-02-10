"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeroSlider.module.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        title: "Premium Construction Materials",
        subtitle: "Source top-quality RMC, aggregate, and steel directly from manufacturers.",
        cta: "Explore Materials",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
        title: "Eco-Friendly Building Solutions",
        subtitle: "Sustainable materials for modern, green construction projects.",
        cta: "Get Quote",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1581094794329-cd19a6d8cb27?q=80&w=2070&auto=format&fit=crop",
        title: "Direct from Quarry to Site",
        subtitle: "Efficient logistics and competitive pricing for bulk orders.",
        cta: "Order Now",
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isPaused) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPaused]);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    return (
        <div
            className={styles.heroSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={styles.sliderContainer}>
                <div
                    className={styles.slidesWrapper}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {SLIDES.map((slide) => (
                        <div
                            key={slide.id}
                            className={styles.slide}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.4)',
                                    zIndex: 1
                                }}
                            />

                            <div className={styles.slideContent} style={{ position: 'relative', zIndex: 2 }}>
                                <h1 className={styles.heading}>{slide.title}</h1>
                                <p className={styles.subheading}>{slide.subtitle}</p>
                                <button className={styles.ctaButton}>{slide.cta}</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    <button onClick={handlePrev} className={styles.controlBtn}>
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={handleNext} className={styles.controlBtn}>
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className={styles.indicators}>
                    {SLIDES.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
