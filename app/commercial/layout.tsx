import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Cleaning",
  description:
    "Eco Elan commercial cleaning for offices, clinics, retail spaces, and shared workplaces across Ontario.",
  openGraph: {
    title: "Eco Elan Commercial Cleaning",
    description: "Healthier workplaces with premium eco-friendly cleaning.",
    images: ["/assets/hero-commercial.webp"],
  },
};

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
