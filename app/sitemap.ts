import type { MetadataRoute } from "next";
import { discoverBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thelaunch.space";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = discoverBlogPosts().map(
    (post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: new Date(post.publishedTime),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...blogPages];
}
