import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
  description:
    "Save more with eco-elan recurring eco cleaning plans for weekly, bi-weekly, and custom home or commercial service.",
  openGraph: {
    title: "eco-elan Subscriptions",
    description: "Recurring eco-friendly cleaning plans across Ontario.",
    images: ["/assets/cleaning-livingroom.webp"],
  },
};

export default function SubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
