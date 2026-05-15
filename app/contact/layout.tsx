import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Eco Elan for eco-friendly cleaning and lawn care services in Ontario. Call +1(437) 2654977 or email info@ecoelan.com.",
  openGraph: {
    title: "Contact Eco Elan",
    description: "Book premium eco-friendly cleaning across Ontario.",
    images: ["/assets/hero-home.webp"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
