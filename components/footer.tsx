"use client"

import { Github, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border text-xs text-muted-foreground space-y-8">
      {/* GitHub Profile Snippet */}
      <div className="p-4 rounded-lg bg-secondary/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-background border border-border text-foreground">
            <Github className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>Yeabsera Sisay</span>
              <span className="text-xs font-mono text-muted-foreground font-normal">@yab-g4u</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              23 public repositories · Open source systems
            </div>
          </div>
        </div>

        <a
          href="https://github.com/yab-g4u"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-accent transition-colors self-start sm:self-auto"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Minimal Signature */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pt-2">
        <div className="space-y-0.5">
          <div className="font-semibold text-foreground">
            Yeabsera Sisay
          </div>
          <div className="text-muted-foreground">
            AI Engineer & Full-Stack Builder
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href="mailto:g4uforlife@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
