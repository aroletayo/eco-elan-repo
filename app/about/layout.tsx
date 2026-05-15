import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Eco Elan's mission to deliver premium non-toxic cleaning and lawn care services across Ontario.",
  openGraph: {
    title: "About Eco Elan",
    description: "Premium sustainable cleaning for homes and businesses.",
    images: ["/assets/Ecoelan-teams.webp"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
