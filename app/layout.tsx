import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import "./globals.css";
import BackToTop from "@/components/BacktopTop";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-two",
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eco-elan.ca"),
  title: {
    default: "eco-elan | Premium Eco-Friendly Cleaning in Ontario",
    template: "%s | eco-elan",
  },
  description:
    "Professional eco-friendly cleaning and lawn care services across Ontario. Safe for your family, gentle on the earth.",
  keywords: [
    "eco cleaning Ontario",
    "green cleaning Toronto",
    "eco-friendly lawn care Ontario",
    "eco-elan",
    "non-toxic cleaning Ontario",
  ],
  openGraph: {
    title: "eco-elan | Premium Eco-Friendly Cleaning in Ontario",
    description:
      "Professional eco-friendly cleaning and lawn care services across Ontario.",
    url: "https://eco-elan.ca",
    siteName: "eco-elan",
    images: [
      {
        url: "/assets/hero-home.webp",
        width: 1200,
        height: 630,
        alt: "eco-elan eco-friendly cleaning service",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body>
        <Providers>
          <div className="relative flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden">
            <BackToTop />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
