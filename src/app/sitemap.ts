import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const CATEGORIES = [
    "Gov. Tender - Central",
    "Gov. Tender - State",
    "Gov. Tender - Municipality",
    "Cement",
    "Glass",
    "Brick and Blocks",
    "TML Steel",
    "Tiles and Flooring",
    "Plumbing",
    "Electrical/Lighting",
    "Windows",
    "Doors",
    "Hardware/Kitchen",
    "Aggregates"
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://xgram.vercel.app";

    const productUrls = PRODUCTS.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    const categoryUrls = CATEGORIES.map((category) => ({
        url: `${baseUrl}/?category=${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...categoryUrls,
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        ...productUrls,
    ];
}
