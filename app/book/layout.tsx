import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Book eco-elan's premium eco-friendly cleaning service online in minutes. First-time clients get 20% off.",
  openGraph: {
    title: "Book eco-elan",
    description: "Book premium eco-friendly cleaning in Ontario.",
    images: ["/assets/cleaning-kitchen.webp"],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
