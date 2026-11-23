import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/writing"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const siteUrl = "https://yeabsera-sisay.vercel.app"

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postEntries,
  ]
}
