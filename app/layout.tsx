import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import "./globals.css";
import BackToTop from "@/components/BacktopTop";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-two",
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eco-elan.ca"),
  title: {
    default: "Eco Elan | Premium Eco-Friendly Cleaning in Ontario",
    template: "%s | Eco Elan",
  },
  description:
    "Professional eco-friendly cleaning and lawn care services across Ontario. Safe for your family, gentle on the earth.",
  keywords: [
    "eco cleaning Ontario",
    "green cleaning Toronto",
    "eco-friendly lawn care Ontario",
    "Eco Elan",
    "non-toxic cleaning Ontario",
  ],
  openGraph: {
    title: "Eco Elan | Premium Eco-Friendly Cleaning in Ontario",
    description:
      "Professional eco-friendly cleaning and lawn care services across Ontario.",
    url: "https://eco-elan.ca",
    siteName: "Eco Elan",
    images: [
      {
        url: "/assets/hero-home.webp",
        width: 1200,
        height: 630,
        alt: "Eco Elan eco-friendly cleaning service",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
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
