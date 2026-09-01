"use client"

import { useEffect } from "react"
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Layers, ShieldCheck, Cpu, Terminal, AlertCircle } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectCaseStudyModalProps {
  project: Project
  onClose: () => void
}

export function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              {project.number}
            </span>
            <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">
              {project.tag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Case Study Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-8 text-zinc-300">
          {/* Main Title & Subtitle */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.name}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {project.subtitle}
            </p>
          </div>

          {/* Highlights Ribbon */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.highlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {highlight}
              </span>
            ))}
          </div>

          {/* Section: The Problem & What Was Built */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>THE PROBLEM</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>WHAT WAS BUILT</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{project.whatWasBuilt}</p>
            </div>
          </div>

          {/* Section: Architecture Flow */}
          {project.architectureSteps && project.architectureSteps.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-300">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>SYSTEM ARCHITECTURE & DATA FLOW</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">END-TO-END EXECUTION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.architectureSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 relative group hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        STAGE {step.step}
                      </span>
                      {idx < project.architectureSteps!.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden lg:block" />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">{step.label}</div>
                    {step.desc && <div className="text-xs text-zinc-400 leading-relaxed">{step.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Technical Decisions */}
          {project.technicalDecisions && project.technicalDecisions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-300 border-b border-zinc-800/80 pb-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>KEY TECHNICAL DECISIONS & TRADE-OFFS</span>
              </div>

              <div className="space-y-3">
                {project.technicalDecisions.map((decision) => (
                  <div
                    key={decision.title}
                    className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80 space-y-1.5"
                  >
                    <div className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {decision.title}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-3.5">
                      {decision.reasoning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-300 border-b border-zinc-800/80 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CHALLENGES & SOLUTIONS</span>
              </div>

              <div className="space-y-3">
                {project.challenges.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80 space-y-2 text-xs sm:text-sm"
                  >
                    <div>
                      <span className="font-mono text-zinc-400 font-bold text-xs uppercase mr-2">Hurdle:</span>
                      <span className="text-zinc-200">{item.challenge}</span>
                    </div>
                    <div className="pl-4 border-l border-emerald-500/40 text-zinc-300">
                      <span className="font-mono text-emerald-400 font-bold text-xs uppercase mr-2">Resolution:</span>
                      <span>{item.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Stack Breakdown */}
          {project.stackGroups && project.stackGroups.length > 0 ? (
            <div className="space-y-4">
              <div className="font-mono text-xs font-semibold text-zinc-300 border-b border-zinc-800/80 pb-2">
                TECHNOLOGY ARCHITECTURE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.stackGroups.map((group) => (
                  <div key={group.category} className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/70">
                    <div className="font-mono text-xs text-zinc-400 mb-2 font-semibold">{group.category}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="font-mono text-xs font-semibold text-zinc-400">TECHNOLOGIES</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Outcome statement */}
          {project.outcome && (
            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs sm:text-sm text-emerald-300">
              <span className="font-mono font-bold uppercase mr-2">Verified Outcome:</span>
              <span>{project.outcome}</span>
            </div>
          )}
        </div>

        {/* Sticky Action Footer */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-zinc-800/80 bg-zinc-900/95">
          <div className="text-xs font-mono text-zinc-500">
            {project.name} // Case Study
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 text-xs font-mono font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-medium transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
