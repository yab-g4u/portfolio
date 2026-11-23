import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { WritingPost, WritingFrontmatter } from "@/types/writing"

const CONTENT_DIR = path.join(process.cwd(), "content", "writing")

/**
 * Calculates reading time based on 200 words per minute
 */
export function calculateReadingTime(text: string): { text: string; minutes: number; words: number } {
  // Strip Markdown characters and HTML tags
  const clean = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`.*?`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[#*_-]/g, "")
    .trim()

  const words = clean ? clean.split(/\s+/).length : 0
  const minutes = Math.max(1, Math.ceil(words / 200))
  return {
    text: `${minutes} min read`,
    minutes,
    words,
  }
}

/**
 * Converts a heading title to a URL-friendly slug
 */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

/**
 * Extracts H2 and H3 headings for the table of contents
 */
export function extractHeadings(markdown: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = []
  const lines = markdown.split("\n")
  let inCodeBlock = false

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const h2Match = line.match(/^##\s+(.+)$/)
    if (h2Match) {
      const text = h2Match[1].replace(/`|\*|_/g, "").trim()
      headings.push({ level: 2, text, id: slugifyHeading(text) })
      continue
    }

    const h3Match = line.match(/^###\s+(.+)$/)
    if (h3Match) {
      const text = h3Match[1].replace(/`|\*|_/g, "").trim()
      headings.push({ level: 3, text, id: slugifyHeading(text) })
    }
  }

  return headings
}

/**
 * Retrieve all published writing posts sorted by date descending.
 * Draft posts are excluded unless includeDrafts is explicitly true.
 */
export function getAllPosts(includeDrafts = false): WritingPost[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))

  const posts: WritingPost[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)
    const frontmatter = data as Partial<WritingFrontmatter>

    const isDraft = Boolean(frontmatter.draft)
    if (isDraft && !includeDrafts) {
      continue
    }

    const slug = file.replace(/\.(md|mdx)$/, "")
    const { text: readingTime, words: wordCount } = calculateReadingTime(content)
    const headings = extractHeadings(content)

    posts.push({
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || "",
      date: frontmatter.date || new Date().toISOString().split("T")[0],
      category: frontmatter.category || "Engineering",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      featured: Boolean(frontmatter.featured),
      draft: isDraft,
      cover: frontmatter.cover || undefined,
      project: frontmatter.project || undefined,
      readingTime,
      wordCount,
      content,
      headings,
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Retrieve a single post by slug
 */
export function getPostBySlug(slug: string, includeDrafts = false): WritingPost | null {
  if (!slug || typeof slug !== "string") return null
  const all = getAllPosts(includeDrafts)
  const target = slug.toLowerCase()
  const found = all.find((p) => (p.slug || "").toLowerCase() === target)
  return found || null
}

/**
 * Retrieve the featured post (or latest if none explicitly marked)
 */
export function getFeaturedPost(): WritingPost | null {
  const posts = getAllPosts()
  if (posts.length === 0) return null
  const explicitlyFeatured = posts.find((p) => p.featured)
  return explicitlyFeatured || posts[0]
}

/**
 * Retrieve related posts sharing tags or category, excluding the current post
 */
export function getRelatedPosts(currentSlug: string, tags: string[], category: string, limit = 2): WritingPost[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug)
  if (all.length === 0) return []
  const targetCat = (category || "").toLowerCase()

  const scored = all.map((post) => {
    let score = 0
    if ((post.category || "").toLowerCase() === targetCat) {
      score += 2
    }
    for (const tag of tags || []) {
      const targetTag = (tag || "").toLowerCase()
      if (post.tags.some((t) => (t || "").toLowerCase() === targetTag)) {
        score += 1
      }
    }
    return { post, score }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
  })

  return scored.slice(0, limit).map((s) => s.post)
}

/**
 * Retrieve all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const set = new Set<string>()
  posts.forEach((p) => {
    if (p.category) set.add(p.category)
  })
  return Array.from(set).sort()
}

/**
 * Retrieve all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const set = new Set<string>()
  posts.forEach((p) => {
    p.tags.forEach((t) => set.add(t))
  })
  return Array.from(set).sort()
}
