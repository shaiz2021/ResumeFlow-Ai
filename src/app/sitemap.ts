import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { templates } from "@/data/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resumeflowai.quesiono.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/templates",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic template routes
  const templateRoutes = templates.map((template) => ({
    url: `${baseUrl}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...templateRoutes];
}
