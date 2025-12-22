"use client"

import type { Project } from "@/types/project"
import { useEffect } from "react"

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const hasDemo = project.demo && project.demo.trim() !== ""
  const hasGithub = project.github && project.github.trim() !== ""

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-8 pb-24 md:pb-8 md:pt-12 px-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[70vh] md:max-h-[80vh] mb-20 md:mb-0 overflow-hidden border-2 border-white bg-black flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - sticky header */}
        <div className="flex-shrink-0 bg-black border-b border-white/20 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
          <div className="text-[10px] md:text-xs tracking-wider text-white/60">
            [PROJECT_{String(project.id).padStart(3, "0")}] // {project.category.toUpperCase()}
          </div>
          <button onClick={onClose} className="text-2xl hover:text-white/60 transition-colors leading-none">
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{project.name}</h2>
            <p className="text-sm text-white/70 leading-relaxed">{project.description}</p>
          </div>

          {/* Long description */}
          <div className="mb-5">
            <div className="text-xs tracking-wider text-white/60 mb-2">[OVERVIEW]</div>
            <p className="text-sm text-white/80 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Metrics (if ML project) */}
          {project.metrics && (
            <div className="mb-5">
              <div className="text-xs tracking-wider text-white/60 mb-3">[PERFORMANCE METRICS]</div>
              <div className="grid grid-cols-3 gap-2">
                {project.metrics.accuracy && (
                  <div className="border border-white/40 p-2 md:p-3 text-center">
                    <div className="text-lg md:text-xl font-bold mb-1">{project.metrics.accuracy}%</div>
                    <div className="text-[8px] md:text-[9px] tracking-wider text-white/60">ACCURACY</div>
                  </div>
                )}
                {project.metrics.loss && (
                  <div className="border border-white/40 p-2 md:p-3 text-center">
                    <div className="text-lg md:text-xl font-bold mb-1">{project.metrics.loss}</div>
                    <div className="text-[8px] md:text-[9px] tracking-wider text-white/60">LOSS</div>
                  </div>
                )}
                {project.metrics.f1Score && (
                  <div className="border border-white/40 p-2 md:p-3 text-center">
                    <div className="text-lg md:text-xl font-bold mb-1">{project.metrics.f1Score}</div>
                    <div className="text-[8px] md:text-[9px] tracking-wider text-white/60">F1-SCORE</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-5">
              <div className="text-xs tracking-wider text-white/60 mb-3">[KEY FEATURES]</div>
              <div className="space-y-1.5">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-white/60 mt-0.5">▸</span>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-4">
            <div className="text-xs tracking-wider text-white/60 mb-3">[TECHNOLOGY STACK]</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs border border-white/40 px-2.5 py-1 tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 bg-black border-t border-white/20 p-4">
          <div className="flex gap-3">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${hasDemo ? "flex-1" : "w-full"} text-center border-2 border-white px-4 py-3 hover:bg-white hover:text-black transition-all duration-75 text-sm tracking-wider font-medium`}
              >
                VIEW GITHUB
              </a>
            )}
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border-2 border-white bg-white text-black px-4 py-3 hover:bg-black hover:text-white transition-all duration-75 text-sm tracking-wider font-medium"
              >
                LIVE DEMO
              </a>
            )}
            {!hasGithub && !hasDemo && (
              <div className="w-full text-center border-2 border-white/30 px-4 py-3 text-sm tracking-wider text-white/50">
                IN DEVELOPMENT
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
