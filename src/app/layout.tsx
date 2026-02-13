import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";
import LayoutContent from "@/layouts/LayoutContent";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://xgram.vercel.app";
const SITE_NAME = "XGram";
const SITE_DESCRIPTION =
  "XGram is India's leading B2B construction materials marketplace. Source premium RMC, cement, aggregates, TMT steel, bricks, tiles, plumbing & electrical supplies directly from manufacturers at competitive prices.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "XGram - Premium B2B Construction Materials Marketplace",
    template: "%s | XGram",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "construction materials",
    "B2B marketplace",
    "RMC",
    "ready mix concrete",
    "cement",
    "aggregates",
    "TMT steel",
    "bricks",
    "blocks",
    "tiles",
    "flooring",
    "plumbing",
    "electrical",
    "building materials",
    "construction supplies",
    "bulk construction materials",
    "India construction",
    "XGram",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon-new.png",
    shortcut: "/icon-new.png",
    apple: "/icon-new.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "XGram - Premium B2B Construction Materials Marketplace",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icon-new.png",
        width: 512,
        height: 512,
        alt: "XGram - Construction Materials Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XGram - Premium B2B Construction Materials Marketplace",
    description: SITE_DESCRIPTION,
    images: ["/icon-new.png"],
    creator: "@xgram",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Construction",
};

export const viewport: Viewport = {
  themeColor: "#00A2F1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-new.png`,
    description: SITE_DESCRIPTION,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-99999-88888",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${dmSans.variable}`}>
        <ClientProviders>
          <LayoutContent>
            {children}
          </LayoutContent>
        </ClientProviders>
      </body>
    </html>
  );
}
