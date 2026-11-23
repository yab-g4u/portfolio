import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen, Terminal } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WritingList } from "@/components/writing/writing-list"
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing — Yeabsera Sisay | Engineering Journal",
  description:
    "Notes from building intelligent systems. AI engineering, computer vision, multi-agent coordination, failures, and lessons learned while turning ideas into working products.",
  alternates: {
    canonical: "https://yeabsera-sisay.vercel.app/writing",
    types: {
      "application/rss+xml": "https://yeabsera-sisay.vercel.app/writing/rss.xml",
    },
  },
  openGraph: {
    title: "Writing — Yeabsera Sisay | Engineering Journal",
    description:
      "Notes from building intelligent systems. AI engineering, computer vision, multi-agent coordination, and real-world software.",
    url: "https://yeabsera-sisay.vercel.app/writing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Yeabsera Sisay | Engineering Journal",
    description:
      "Notes from building intelligent systems. AI engineering, computer vision, and systems engineering.",
  },
}

export default function WritingIndexPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#d60407]/30 selection:text-foreground font-sans">
      {/* Top Navigation */}
      <Navigation />

      {/* Main Container constrained to ~740px */}
      <main className="max-w-[740px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-8">
        {/* Back Link & Section Indicator */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to portfolio</span>
          </Link>
          <span className="font-mono text-[11px] text-accent dark:text-[#ffb0b0]">journal / index</span>
        </div>

        {/* Editorial Introduction */}
        <header className="space-y-3 pt-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#d60407]/15 dark:bg-[#d60407]/20 text-accent dark:text-[#ff6a6a] border border-[#ff2b2b]/30">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent dark:text-[#ffb0b0]">
              Engineering Publication
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-foreground glow">
            Writing
          </h1>

          <div className="space-y-2 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground">
              Notes from building intelligent systems.
            </p>
            <p>
              I write about AI engineering, computer vision, experiments, failures, and lessons
              learned while turning ideas into working products.
            </p>
          </div>
        </header>

        {/* Interactive Articles Filter & List */}
        <WritingList posts={posts} categories={categories} tags={tags} />

        {/* Footer */}
        <div className="pt-8">
          <Footer />
        </div>
      </main>
    </div>
  )
}
