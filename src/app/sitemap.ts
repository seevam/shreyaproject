import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { getAllPosts, getCategories } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();

  return [
    { url: url("/"), priority: 1 },
    { url: url("/about/") },
    { url: url("/cards/") },
    { url: url("/blog/") },
    { url: url("/feedback/") },
    ...getCategories().map((category) => ({
      url: url(`/blog/category/${category.slug}/`),
    })),
    ...getAllPosts().map((post) => ({
      url: url(`/blog/${post.slug}/`),
      lastModified: post.isoDate,
    })),
  ];
}
