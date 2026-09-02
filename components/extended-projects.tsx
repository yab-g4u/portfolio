"use client"

import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { ProjectVisual } from "@/components/project-visual"

export function ExtendedProjects() {
  const extendedProjects = [
    {
      id: "suno",
      name: "Suno",
      badge: "Vision & Assistive Speech",
      description:
        "Computer vision & gesture tracking helping children establish speech through interactive play and real-time articulatory kinematics.",
      tags: ["Computer Vision", "Pose Estimation", "Interactive Audio", "TypeScript", "React"],
      github: null,
      demo: "https://sunoos.vercel.app/",
    },
    {
      id: "surf",
      name: "Surf",
      badge: "Local IR / Zero-Cloud",
      description:
        "Local-first, privacy-first hybrid search engine for developer datasets (Reddit, Telegram, Devpost, X) using SQLite FTS5 BM25 lexical ranking and sentence-transformer embeddings via RRF.",
      tags: ["Local-First", "Information Retrieval", "SQLite FTS5", "Vector Search", "RRF", "Python"],
      github: "https://github.com/yab-g4u/surf.git",
      demo: null,
    },
    {
      id: "candidateflow",
      name: "CandidateFlow",
      badge: "AI Recruitment Engine",
      description:
        "AI recruitment workflow that transforms messy, unstructured resumes and portfolios into structured, recruiter-ready candidate profiles with semantic skill scoring.",
      tags: ["Structured Extraction", "Document Ingestion", "FastAPI", "React", "Python"],
      github: "https://github.com/yab-g4u",
      demo: "https://candidatefloww.netlify.app/",
    },
    {
      id: "shieldguard",
      name: "ShieldGuard",
      badge: "Telecom Trust & CAMARA",
      description:
        "AI-powered telecom trust orchestration for mobile money & digital payments using GSMA CAMARA Open Gateway signals to block SIM-swap fraud in Sub-Saharan Africa.",
      tags: ["CAMARA APIs", "Fraud Mitigation", "Telecom AI", "Fintech Security"],
      github: "https://github.com/yab-g4u/shield-guard.git",
      demo: "https://shieldguard.vercel.app/",
    },
    {
      id: "indiecrop",
      name: "IndieCrop",
      badge: "AgriTech & Blockchain PWA",
      description:
        "Multi-role Progressive Web App transforming agriculture through AI crop recommendations, blockchain-backed farm verification, and FAO / NGO policy insights.",
      tags: ["PWA", "Agriculture AI", "Blockchain Verification", "TypeScript"],
      github: "https://github.com/yab-g4u/indie-crope.git",
      demo: "https://indiecropp.vercel.app/",
    },
  ]

  return (
    <section id="extended-projects" className="py-12 border-t border-border">
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Extended systems
            </h2>
            <p className="text-xs text-muted-foreground">
              Local-first engines, domain tooling, and assistive interfaces.
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-mono">06 — 10</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {extendedProjects.map((p) => (
            <div
              key={p.name}
              className="p-4 sm:p-5 rounded-lg bg-card border border-border space-y-3.5 hover:border-foreground/20 transition-all shadow-xs"
            >
              {/* Optional Mini Visual for standout projects */}
              <div className="block">
                <ProjectVisual id={p.id} name={p.name} className="h-28 sm:h-32" />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      {p.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                      {p.badge}
                    </span>
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-3 shrink-0 text-xs font-medium">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent inline-flex items-center gap-0.5 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                      >
                        <span>Source</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.description}
                </p>

                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-secondary/80 border border-border/50 text-[10px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
