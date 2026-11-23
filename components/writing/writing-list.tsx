"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, X, Calendar, Clock, ArrowUpRight, Sparkles, Tag as TagIcon, Rss } from "lucide-react"
import type { WritingPost } from "@/types/writing"

interface WritingListProps {
  posts: WritingPost[]
  categories: string[]
  tags: string[]
}

export function WritingList({ posts, categories, tags }: WritingListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Filtered posts based on search, category, and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false
      }

      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = post.title.toLowerCase().includes(q)
        const matchDesc = post.description.toLowerCase().includes(q)
        const matchCategory = post.category.toLowerCase().includes(q)
        const matchTags = post.tags.some((t) => t.toLowerCase().includes(q))
        const matchContent = post.content.toLowerCase().includes(q)
        return matchTitle || matchDesc || matchCategory || matchTags || matchContent
      }

      return true
    })
  }, [posts, selectedCategory, selectedTag, searchQuery])

  // Featured post: when in default view (All, no tag, no search), pick the top featured article
  const isDefaultView = selectedCategory === "All" && !selectedTag && !searchQuery.trim()
  const featuredPost = useMemo(() => {
    if (!isDefaultView) return null
    return posts.find((p) => p.featured) || posts[0] || null
  }, [posts, isDefaultView])

  // Non-featured posts to list
  const listPosts = useMemo(() => {
    if (isDefaultView && featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    }
    return filteredPosts
  }, [filteredPosts, isDefaultView, featuredPost])

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number)
      if (!year || !month || !day) return dateStr
      const date = new Date(Date.UTC(year, month - 1, day))
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(date)
    } catch {
      return dateStr
    }
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedTag(null)
    setSearchQuery("")
  }

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Categories */}
      <div className="space-y-3.5 pt-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, systems, tags, or topics..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-border bg-card/60 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
            aria-label="Search articles"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills & RSS Link */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-foreground text-background"
                  : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All Articles ({posts.length})
            </button>
            {categories.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span
                    className={`ml-1.5 text-[10px] font-mono ${
                      isActive ? "text-background/80" : "text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <a
            href="/writing/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card/60 hover:bg-secondary text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
            title="RSS feed"
          >
            <Rss className="w-3.5 h-3.5 text-amber-500/90" />
            <span className="font-mono text-[11px] hidden sm:inline">RSS</span>
          </a>
        </div>

        {/* Active Tag Filter indicator if chosen */}
        {selectedTag && (
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="text-muted-foreground">Filtering by tag:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-accent/10 text-accent font-medium font-mono text-[11px]">
              #{selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="hover:opacity-75 cursor-pointer ml-1"
                title="Remove tag filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
            <button
              onClick={clearFilters}
              className="text-[11px] text-muted-foreground underline hover:text-foreground cursor-pointer ml-auto"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Featured Article (when in default view) */}
      {isDefaultView && featuredPost && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Featured Note</span>
          </div>

          <Link
            href={`/writing/${featuredPost.slug}`}
            className="group block p-5 sm:p-6 rounded-lg border border-border bg-card hover:border-foreground/25 transition-all shadow-xs space-y-3.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                {featuredPost.category}
              </span>
              <div className="flex items-center gap-3 text-muted-foreground text-[11.5px] font-mono">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 opacity-60" />
                  {formatDate(featuredPost.date)}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 opacity-60" />
                  {featuredPost.readingTime}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors flex items-center justify-between gap-2">
                <span>{featuredPost.title}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {featuredPost.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/60">
              <div className="flex flex-wrap gap-1.5">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors inline-flex items-center gap-1">
                Read engineering note &rarr;
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>
            {isDefaultView ? "Latest Notes" : `Matching Articles (${filteredPosts.length})`}
          </span>
          {(searchQuery || selectedCategory !== "All" || selectedTag) && (
            <button
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-lg border border-dashed border-border bg-card/40 space-y-3">
            <p className="text-sm font-medium text-foreground">No engineering notes found.</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No articles matched your filter criteria. Try adjusting keywords or viewing all
              categories.
            </p>
            <button
              onClick={clearFilters}
              className="px-3.5 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {listPosts.map((post) => (
              <article key={post.slug} className="group py-5 sm:py-6 transition-colors">
                <Link href={`/writing/${post.slug}`} className="block space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-foreground/80 font-medium">
                        {post.category}
                      </span>
                      {post.project && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          re: {post.project}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground text-[11.5px] font-mono">
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors flex items-center justify-between gap-2">
                      <span>{post.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={(e) => {
                          e.preventDefault()
                          setSelectedTag(tag)
                        }}
                        className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Popular Tags Cloud Footer */}
      {tags.length > 0 && (
        <div className="pt-6 border-t border-border space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <TagIcon className="w-3 h-3" />
            <span>Index by Engineering Domain</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => {
              const isSelected = selectedTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-foreground text-background font-medium"
                      : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  #{tag}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
