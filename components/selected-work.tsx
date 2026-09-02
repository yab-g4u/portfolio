"use client"

import { useState } from "react"
import { ArrowUpRight, ChevronRight, X, Github, ExternalLink, FileCode, Layers } from "lucide-react"
import type { Project } from "@/types/project"
import { projects } from "@/lib/projects-data"
import { ProjectVisual } from "@/components/project-visual"
import {
  PythonIcon,
  FastApiIcon,
  TypeScriptIcon,
  NextjsIcon,
  GitHubBrandIcon,
} from "@/components/tech-icons"

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
      tagline: "AI-powered infrastructure that turns GitHub repositories into deployable portfolios.",
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
      tagline: "AI-powered healthcare assistant & blockchain pharmaceutical discovery.",
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
      tagline: "Explainable machine-learning platform for financial & microfinance datasets.",
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
    <section id="selected-work" className="py-12 border-t border-border">
      <div className="space-y-8">
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Selected work
            </h2>
            <p className="text-xs text-muted-foreground">
              Flagship engineering projects & production architectures.
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-mono">01 — 05</span>
        </div>

        {/* Project List with Mobile Visual Cards & Desktop Editorial Flow */}
        <div className="space-y-8 divide-y divide-border">
          {selectedProjects.map((p) => (
            <div
              key={p.number}
              className="pt-8 first:pt-0 group transition-colors space-y-4"
            >
              {/* Abstract Visual Identity Banner */}
              <div className="block">
                <ProjectVisual id={p.id} name={p.name} />
              </div>

              {/* Information Row */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-secondary text-foreground">
                      {p.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  {/* Desktop Quick Links */}
                  <div className="hidden sm:flex items-center gap-3 text-xs font-medium shrink-0">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent inline-flex items-center gap-1 transition-colors"
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
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenDetails(p.dataId)}
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                    >
                      <span>Arch Notes</span>
                      <ChevronRight className="w-3 h-3 opacity-60" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-foreground font-medium leading-relaxed">
                  {p.tagline}
                </p>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.description}
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-secondary/70 border border-border/60 text-[11px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile Touch-Friendly Action Buttons */}
                <div className="flex sm:hidden items-center gap-2 pt-2">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-foreground text-background text-xs font-medium active:scale-[0.98] transition-transform"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-secondary border border-border text-foreground text-xs font-medium active:scale-[0.98] transition-transform"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleOpenDetails(p.dataId)}
                    className="p-2 rounded-md bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition-colors"
                    title="View Architectural Notes"
                    aria-label="View Architectural Notes"
                  >
                    <FileCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-card border border-border rounded-lg shadow-xl max-h-[85vh] overflow-y-auto p-5 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-1">
                  {activeProject.number} // ARCHITECTURAL NOTES
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
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
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
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
                      className="p-2.5 sm:p-3 rounded bg-secondary/50 border border-border/70 text-xs font-mono space-y-0.5"
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
            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-medium flex-wrap">
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
