"use client"

import { ArrowUpRight } from "lucide-react"

export function Intro() {
  return (
    <section className="pt-10 sm:pt-14 pb-10">
      <div className="space-y-5">
        {/* Main Heading & Positioning */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Hi, I&apos;m Yeabsera.
          </h1>
          <div className="text-base sm:text-lg font-medium text-foreground/90">
            AI Engineer & Full-Stack Builder
          </div>
        </div>

        {/* Short Description */}
        <p className="text-base sm:text-lg text-foreground font-normal leading-relaxed">
          I build AI systems that turn messy real-world problems into working products.
        </p>

        {/* Supporting Paragraph */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          I work across AI systems, multi-agent applications, voice interfaces, developer tools, and full-stack products.
        </p>

        {/* Quick Links */}
        <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent font-medium transition-colors inline-flex items-center gap-1 group"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent font-medium transition-colors inline-flex items-center gap-1 group"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="mailto:g4uforlife@gmail.com"
            className="text-foreground hover:text-accent font-medium transition-colors inline-flex items-center gap-1 group"
          >
            <span>Email</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="/cv/YEABSERA-SISAY.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>
      </div>
    </section>
  )
}
