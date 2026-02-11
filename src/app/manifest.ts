import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "XGram - Premium Construction Marketplace",
        short_name: "XGram",
        description: "India's leading B2B construction materials marketplace.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#5046E5",
        icons: [
            {
                src: "/icon.png",
                sizes: "any",
                type: "image/png",
            },
        ],
    };
}
