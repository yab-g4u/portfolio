import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { WritingPost } from "@/types/writing"

interface WritingPreviewProps {
  posts: WritingPost[]
}

function formatDate(dateStr: string) {
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

export function WritingPreview({ posts }: WritingPreviewProps) {
  if (!posts || posts.length === 0) return null

  const displayPosts = posts.slice(0, 4)

  return (
    <section id="writing">
      <div className="head">
        <div className="ghost" aria-hidden="true">
          WRITING
        </div>
        <small className="rv">Engineering Journal</small>
        <h2 className="glow rv">Notes from building intelligent systems.</h2>
        <div className="bar" />
        <p className="rv">
          Architecture notes, computer vision debugging logs, voice AI pipelines, and lessons learned shipping systems.
        </p>
      </div>

      <div className="grid-cards">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="paper rv group justify-between"
          >
            <div>
              <small>
                {post.category} · {formatDate(post.date)} · {post.readingTime}
              </small>
              <h5 className="group-hover:text-[#ffd0d0] transition-colors">
                {post.title}
              </h5>
              {post.project && <div className="au">Related system: {post.project}</div>}
              <p>{post.description}</p>
            </div>

            <div className="tgs" style={{ marginTop: "18px" }}>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tg">
                  #{tag}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-[12px] text-[#ffb3b3] group-hover:text-white transition-colors">
                <span>Read</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="btns rv" style={{ marginTop: "32px" }}>
        <Link href="/writing" className="pill solid">
          <span>Explore all engineering notes</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
