"use client"

import { useState } from "react"
import { ArrowUpRight, ChevronRight, X, Github, ExternalLink } from "lucide-react"
import type { Project } from "@/types/project"
import { projects } from "@/lib/projects-data"

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const selectedProjects = [
    {
      number: "01",
      id: "omniq",
      name: "Omniq",
      tagline: "Voice AI infrastructure for people without smartphones.",
      description:
        "Explores voice-based access through 2G/PSTN, realtime conversational AI, IVR, structured information extraction, and multilingual interaction.",
      tags: ["Python", "Voice AI", "Realtime Systems", "IVR", "LLMs"],
      github: "https://github.com/yab-g4u/omniq.git",
      demo: "https://omniq-sigma.vercel.app/",
      dataId: "omniq",
    },
    {
      number: "02",
      id: "medscope",
      name: "Medscope",
      tagline: "Multi-Agent Epidemic Coordination System.",
      description:
        "AI-powered public-health intelligence system combining epidemic simulation with specialized AI agents for policy, logistics, government response, and sentiment analysis.",
      tags: ["Multi-Agent AI", "Epidemic Simulation", "Blockchain", "AI Decision Support"],
      github: "https://github.com/yab-g4u/medscop.git",
      demo: "https://medscop.vercel.app/",
      dataId: "medscope",
    },
    {
      number: "03",
      id: "atlas",
      name: "ATLAS",
      tagline: "AI-powered infrastructure that turns GitHub repositories and professional information into a deployable portfolio.",
      description:
        "GitHub intelligence, resume/professional information ingestion, project analysis, design synthesis, portfolio generation, and one-click deployment.",
      tags: ["GitHub Intelligence", "Resume Ingestion", "Design Synthesis", "Next.js", "AI Automation"],
      github: "https://github.com/yab-g4u/attlas",
      demo: "https://attlas-nu.vercel.app/",
      dataId: "atlas",
    },
    {
      number: "04",
      id: "ida",
      name: "IDA",
      tagline: "AI-powered healthcare assistant combining medicine information, pharmacy discovery, location-based services, and a blockchain-powered medicine marketplace.",
      description:
        "Provides verified medicine discovery, clinical interaction warnings, geographic pharmacy stock locator, and trust-anchored pharmaceutical transactions.",
      tags: ["Healthcare AI", "Search & Discovery", "Location Services", "Blockchain Marketplace", "Python"],
      github: "https://github.com/yab-g4u/IDA",
      demo: "https://ida-test.vercel.app/",
      dataId: "ida",
    },
    {
      number: "05",
      id: "datapilot",
      name: "DataPilot",
      tagline: "An explainable machine-learning platform for financial and microfinance datasets.",
      description:
        "Handles data preprocessing, automated machine learning model evaluation, SHAP explainability analysis, PDF audit reports, and FastAPI inference.",
      tags: ["Machine Learning", "SHAP Explainability", "PDF Audits", "FastAPI", "Python"],
      github: "https://github.com/yab-g4u/DataPilot",
      demo: "",
      dataId: "datapilot",
    },
  ]

  const handleOpenDetails = (dataId: string) => {
    const found = projects.find((p) => p.id === dataId)
    if (found) {
      setActiveProject(found)
    }
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Selected work
          </h2>
          <span className="text-xs text-muted-foreground font-mono">01 — 05</span>
        </div>

        {/* Clean Vertical Project List */}
        <div className="divide-y divide-border">
          {selectedProjects.map((p) => (
            <div
              key={p.number}
              className="py-8 first:pt-2 last:pb-2 group transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 justify-between">
                {/* Number & Info */}
                <div className="space-y-2.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <p className="text-sm text-foreground font-medium leading-relaxed max-w-xl">
                    {p.tagline}
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-muted-foreground font-mono">
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

                {/* Direct Action Links */}
                <div className="flex items-center gap-4 text-xs font-medium pt-1 sm:pt-0 shrink-0">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  <button
                    onClick={() => handleOpenDetails(p.dataId)}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                  >
                    <span>Notes</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Technical Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-card border border-border rounded-lg shadow-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  {activeProject.number} // ARCHITECTURAL NOTES
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {activeProject.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close notes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                What Was Built
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {activeProject.whatWasBuilt || activeProject.description}
              </p>
            </div>

            {/* Architecture Steps */}
            {activeProject.architectureSteps && activeProject.architectureSteps.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  System Architecture Pipeline
                </h4>
                <div className="space-y-2">
                  {activeProject.architectureSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-3 rounded bg-secondary/50 border border-border/70 text-xs font-mono space-y-0.5"
                    >
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <span className="text-accent">{step.step}</span>
                        <span>{step.label}</span>
                      </div>
                      <p className="text-muted-foreground text-[11px] pl-6 font-sans">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Decisions */}
            {activeProject.technicalDecisions && activeProject.technicalDecisions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Key Technical Decisions
                </h4>
                <div className="space-y-2">
                  {activeProject.technicalDecisions.map((dec) => (
                    <div key={dec.title} className="p-3 rounded bg-secondary/40 border border-border/60 space-y-1">
                      <div className="text-xs font-semibold text-foreground">
                        {dec.title}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {dec.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Links */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-medium">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent inline-flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Code</span>
                  </a>
                )}
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
