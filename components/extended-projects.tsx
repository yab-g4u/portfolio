"use client"

import { ArrowUpRight } from "lucide-react"

export function ExtendedProjects() {
  const extendedProjects = [
    {
      name: "Suno",
      description:
        "A computer vision project designed to help children establish speech and talking through visual interaction and movement tracking.",
      tags: ["Computer Vision", "Pose Estimation", "Interactive Audio", "TypeScript", "React"],
      github: null,
      demo: "https://sunoos.vercel.app/",
    },
    {
      name: "Surf",
      description:
        "Local-first, privacy-first hybrid search engine for the developer internet. Searches across Reddit, Telegram, Devpost, X data imports, and LinkedIn imports from one local interface using SQLite, FTS5 BM25 lexical search, local sentence-transformer embeddings, vector similarity storage in SQLite, and Reciprocal Rank Fusion (RRF). No mandatory hosted LLM APIs. No hosted vector database.",
      tags: ["Local-First", "Information Retrieval", "SQLite FTS5", "Vector Search", "RRF", "Python"],
      github: "https://github.com/yab-g4u/surf.git",
      demo: null,
    },
    {
      name: "CandidateFlow",
      description:
        "An AI-powered recruitment workflow that automatically transforms unstructured candidate information into structured recruiter-ready profiles.",
      tags: ["Structured Extraction", "Document Ingestion", "FastAPI", "React"],
      github: "https://github.com/yab-g4u",
      demo: "https://candidatefloww.netlify.app/",
    },
    {
      name: "ShieldGuard",
      description:
        "AI-powered telecom trust orchestration for mobile money, fintech, and digital services. Demonstrates how developers can use Open Gateway / CAMARA network signals to protect transactions, identity onboarding, and digital trust with a focus on Sub-Saharan Africa.",
      tags: ["CAMARA APIs", "Fraud Mitigation", "Telecom AI", "Fintech Security"],
      github: "https://github.com/yab-g4u/shield-guard.git",
      demo: "https://shieldguard.vercel.app/",
    },
    {
      name: "IndieCrop",
      description:
        "A multi-role Progressive Web App transforming agriculture through AI-powered crop recommendations, blockchain-backed farm verification, and data-driven policy insights connecting Field Agents, NGOs / FAO, and Government agencies.",
      tags: ["PWA", "Agriculture AI", "Blockchain Verification", "TypeScript"],
      github: "https://github.com/yab-g4u/indie-crope.git",
      demo: "https://indiecropp.vercel.app/",
    },
  ]

  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Extended projects
          </h2>
          <p className="text-xs text-muted-foreground">
            Secondary systems exploring systems engineering, local-first architectures, and domain-specific tools.
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {extendedProjects.map((p) => (
            <div key={p.name} className="py-6 first:pt-2 last:pb-2 space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-semibold text-foreground">
                  {p.name}
                </h3>
                <div className="flex items-center gap-3 shrink-0 text-xs font-medium">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                    >
                      <span>Live demo</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {p.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5 text-[11px] text-muted-foreground font-mono">
                {p.tags.map((tag, idx) => (
                  <span key={tag} className="flex items-center gap-2">
                    <span>{tag}</span>
                    {idx < p.tags.length - 1 && (
                      <span className="text-muted-foreground/40">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
