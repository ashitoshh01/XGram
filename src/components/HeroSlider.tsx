"use client";

import React, { useState, useEffect, useCallback } from "react";
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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isPaused) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPaused]);

    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset touch end
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true); // Pause auto-slide on interaction
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }

        setIsPaused(false); // Resume auto-slide
    };

    return (
        <div
            className={styles.heroSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
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
                            {/* Gradient overlay */}
                            <div className={styles.slideOverlay} />

                            <div className={styles.slideContent}>
                                <h1 className={styles.heading}>{slide.title}</h1>
                                <p className={styles.subheading}>{slide.subtitle}</p>
                                <button className={styles.ctaButton}>{slide.cta}</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    <button onClick={handlePrev} className={styles.controlBtn} aria-label="Previous slide">
                        <ChevronLeft size={22} />
                    </button>
                    <button onClick={handleNext} className={styles.controlBtn} aria-label="Next slide">
                        <ChevronRight size={22} />
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
