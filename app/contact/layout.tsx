import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact eco-elan for eco-friendly cleaning and lawn care services in Ontario. Call +1(437) 2654977 or email info@eco-elan.com.",
  openGraph: {
    title: "Contact eco-elan",
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
