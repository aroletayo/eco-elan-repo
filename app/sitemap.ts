import type { MetadataRoute } from "next";

const baseUrl = "https://eco-elan.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/subscriptions",
    "/commercial",
    "/about",
    "/contact",
    "/book",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
