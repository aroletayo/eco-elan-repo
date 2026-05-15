import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Eco Elan's eco-friendly cleaning, deep cleaning, move in/out, commercial, window cleaning, and lawn care services across Ontario.",
  openGraph: {
    title: "Eco Elan Services",
    description: "Premium eco-friendly cleaning services across Ontario.",
    images: ["/assets/Ecoelan-services.webp"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
