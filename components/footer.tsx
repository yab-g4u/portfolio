"use client"

import Link from "next/link"
import { useResume } from "@/lib/resume-context"

export function Footer() {
  const { openResume } = useResume()

  return (
    <footer className="site-footer">
      <div className="ghost" aria-hidden="true">
        SISAY
      </div>

      <p
        className="glow"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "26px",
          color: "#fff",
        }}
      >
        Yeabsera Sisay
      </p>
      <p style={{ marginTop: "4px" }}>
        AI Engineer &amp; Full-Stack Builder · @yab-g4u · 23 public repositories
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-white/75">
        <a
          href="https://github.com/yab-g4u"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <span>·</span>
        <a
          href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        <span>·</span>
        <Link href="/writing" className="hover:text-white transition-colors">
          Writing
        </Link>
        <span>·</span>
        <button
          type="button"
          onClick={openResume}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Resume (CV)
        </button>
        <span>·</span>
        <a href="mailto:g4uforlife@gmail.com" className="hover:text-white transition-colors">
          Email
        </a>
      </div>
    </footer>
  )
}
