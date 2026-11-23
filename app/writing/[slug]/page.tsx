import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, BookOpen, ArrowRight, Tag as TagIcon } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TableOfContents } from "@/components/writing/table-of-contents"
import { MarkdownRenderer } from "@/components/writing/markdown-renderer"
import { ShareButtons } from "@/components/writing/share-buttons"
import { RelatedProjectCard } from "@/components/writing/related-project-card"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/writing"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params
  const slug = resolved?.slug
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return {
      title: "Article Not Found — Yeabsera Sisay",
    }
  }

  const siteUrl = "https://yeabsera-sisay.vercel.app"
  const url = `${siteUrl}/writing/${post.slug}`

  return {
    title: `${post.title} — Yeabsera Sisay`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["Yeabsera Sisay"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function WritingDetailPage({ params }: PageProps) {
  const resolved = await params
  const slug = resolved?.slug
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const relatedPosts = getRelatedPosts(post.slug, post.tags, post.category, 2)

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number)
      if (!year || !month || !day) return dateStr
      const date = new Date(Date.UTC(year, month - 1, day))
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(date)
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#d60407]/30 selection:text-foreground font-sans">
      {/* Top Navigation */}
      <Navigation />

      {/* Main Container */}
      <main className="max-w-[740px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-8">
        {/* Navigation Breadcrumb / Back */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Writing</span>
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent dark:text-[#ffb0b0]">
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pt-2 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#d60407]/12 dark:bg-[#d60407]/20 text-accent dark:text-[#ffb0b0] border border-[#ff2b2b]/30">
              {post.category}
            </span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-3 text-muted-foreground font-mono text-[11.5px]">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 opacity-60" />
                {formatDate(post.date)}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 opacity-60" />
                {post.readingTime}
              </span>
              <span>•</span>
              <span>{post.wordCount} words</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.08]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50 text-xs">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center font-mono text-[11px] font-bold text-foreground">
                YS
              </div>
              <span className="text-muted-foreground">
                By <strong className="text-foreground font-medium">Yeabsera Sisay</strong>
              </span>
            </div>

            {/* Social Share Buttons */}
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </header>

        {/* Table of Contents (if 2 or more headings) */}
        {post.headings.length >= 2 && (
          <TableOfContents headings={post.headings} />
        )}

        {/* Article Body Content */}
        <article className="pt-2">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Article Footer Tags */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <TagIcon className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground mr-1">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-foreground/80 border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share Bar */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <span className="text-xs text-muted-foreground font-medium">
              Did you find this technical breakdown useful?
            </span>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>

        {/* Related Project Connection (if project specified in frontmatter) */}
        {post.project && (
          <RelatedProjectCard projectName={post.project} />
        )}

        {/* Previous / Next Article Navigation */}
        {(prevPost || nextPost) && (
          <nav
            aria-label="Article navigation"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border"
          >
            {prevPost ? (
              <Link
                href={`/writing/${prevPost.slug}`}
                className="group p-4 rounded-lg border border-border bg-card hover:border-foreground/20 transition-all space-y-1 block"
              >
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  Previous Note
                </span>
                <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                href={`/writing/${nextPost.slug}`}
                className="group p-4 rounded-lg border border-border bg-card hover:border-foreground/20 transition-all space-y-1 block text-left sm:text-right"
              >
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1 sm:justify-end">
                  Next Note
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="pt-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Related Engineering Notes
              </h3>
              <Link
                href="/writing"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/writing/${related.slug}`}
                  className="group p-4 rounded-lg border border-border bg-card hover:border-foreground/20 transition-all space-y-2 block"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{related.category}</span>
                    <span>{related.readingTime}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-[11.5px] text-muted-foreground line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="pt-8">
          <Footer />
        </div>
      </main>
    </div>
  )
}
