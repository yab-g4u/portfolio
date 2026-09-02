"use client"

import { ArrowUpRight, Mail, FileText, Sparkles, MapPin, Eye } from "lucide-react"
import {
  GitHubBrandIcon,
  LinkedInBrandIcon,
  PythonIcon,
  NextjsIcon,
  FastApiIcon,
  PostgresIcon,
  TypeScriptIcon,
  LangChainIcon,
  PyTorchIcon,
  DockerIcon,
  SqliteIcon,
} from "@/components/tech-icons"
import { useResume } from "@/lib/resume-context"

export function Intro() {
  const { openResume } = useResume()

  const coreTech = [
    { name: "Python", icon: PythonIcon },
    { name: "Next.js", icon: NextjsIcon },
    { name: "FastAPI", icon: FastApiIcon },
    { name: "PostgreSQL", icon: PostgresIcon },
    { name: "LangChain", icon: LangChainIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "PyTorch", icon: PyTorchIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "SQLite", icon: SqliteIcon },
  ]

  return (
    <section id="overview" className="pt-8 sm:pt-14 pb-8 sm:pb-10">
      <div className="space-y-6 sm:space-y-7">
        {/* Availability & Location Pill */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/80 border border-border/80 text-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-medium">Available for AI Engineering</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/40 border border-border/50 text-muted-foreground text-[11px]">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span>Addis Ababa (UTC+3)</span>
          </div>
        </div>

        {/* Main Headline & Positioning */}
        <div className="space-y-2.5 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Hi, I&apos;m Yeabsera.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground font-medium leading-snug">
            AI Engineer building intelligent systems that solve real problems.
          </p>
        </div>

        {/* Short Bio */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
          I design and ship end-to-end AI systems, multi-agent coordination architectures, low-latency telephony voice interfaces, and production full-stack software.
        </p>

        {/* Social & Direct Links with Vector Icons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-md bg-secondary/60 hover:bg-secondary border border-border/80 text-foreground font-medium transition-all group active:scale-[0.98]"
          >
            <GitHubBrandIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-md bg-secondary/60 hover:bg-secondary border border-border/80 text-foreground font-medium transition-all group active:scale-[0.98]"
          >
            <LinkedInBrandIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="mailto:g4uforlife@gmail.com"
            className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-md bg-secondary/60 hover:bg-secondary border border-border/80 text-foreground font-medium transition-all group active:scale-[0.98]"
          >
            <Mail className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <button
            onClick={openResume}
            className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-all group active:scale-[0.98] shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
            <Eye className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Recognizable Technology Chips */}
        <div className="space-y-2 pt-2 border-t border-border/60">
          <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            Core stack & tools
          </div>
          <div className="flex flex-wrap gap-1.5">
            {coreTech.map((tech) => {
              const IconComp = tech.icon
              return (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/40 border border-border/60 text-xs font-mono text-foreground hover:border-foreground/20 transition-colors"
                >
                  <IconComp className="w-3.5 h-3.5 text-accent opacity-90" />
                  <span>{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
