import Link from "next/link"
import { ArrowUpRight, Github, ExternalLink, Cpu } from "lucide-react"
import { getProjectByNameOrId } from "@/lib/projects-data"

interface RelatedProjectCardProps {
  projectName: string
}

export function RelatedProjectCard({ projectName }: RelatedProjectCardProps) {
  const project = getProjectByNameOrId(projectName)

  if (!project) return null

  return (
    <div className="my-8 p-5 sm:p-6 rounded-lg border border-border bg-card/80 backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-accent/10 text-accent">
            <Cpu className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Related Engineering System
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-secondary">
          {project.tag}
        </span>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
          <span>{project.name}</span>
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {project.subtitle || project.description}
        </p>
      </div>

      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/70 text-foreground/80 border border-border/50"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            <span>Live System</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors font-medium"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Repository</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        )}

        <Link
          href={`/#${project.isFeatured ? "selected-work" : "extended-projects"}`}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs ml-auto"
        >
          <span>View on portfolio</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
