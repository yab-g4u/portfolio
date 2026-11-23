import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/writing"

export async function GET() {
  const posts = getAllPosts()
  const siteUrl = "https://yeabsera-sisay.vercel.app"

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/writing/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      // Escape special XML characters
      const escapeXml = (unsafe: string) =>
        unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;")

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`
    })
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yeabsera Sisay — Engineering Journal</title>
    <link>${siteUrl}/writing</link>
    <description>Notes from building intelligent systems. AI engineering, computer vision, multi-agent systems, and real-world software.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/writing/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
