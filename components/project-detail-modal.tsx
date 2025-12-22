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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-white bg-black p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl hover:text-white/60 transition-colors z-10"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2">
            [PROJECT_{String(project.id).padStart(3, "0")}] // {project.category.toUpperCase()}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{project.name}</h2>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">{project.description}</p>
        </div>

        {/* Long description */}
        <div className="mb-6">
          <div className="text-xs tracking-wider text-white/60 mb-2">[OVERVIEW]</div>
          <p className="text-sm text-white/80 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Metrics (if ML project) */}
        {project.metrics && (
          <div className="mb-6">
            <div className="text-xs tracking-wider text-white/60 mb-3">[PERFORMANCE METRICS]</div>
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.accuracy && (
                <div className="border border-white/40 p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{project.metrics.accuracy}%</div>
                  <div className="text-[10px] tracking-wider text-white/60">ACCURACY</div>
                </div>
              )}
              {project.metrics.loss && (
                <div className="border border-white/40 p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{project.metrics.loss}</div>
                  <div className="text-[10px] tracking-wider text-white/60">LOSS</div>
                </div>
              )}
              {project.metrics.f1Score && (
                <div className="border border-white/40 p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{project.metrics.f1Score}</div>
                  <div className="text-[10px] tracking-wider text-white/60">F1-SCORE</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6">
            <div className="text-xs tracking-wider text-white/60 mb-3">[KEY FEATURES]</div>
            <div className="space-y-2">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-white/60 mt-1">▸</span>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div className="mb-6">
          <div className="text-xs tracking-wider text-white/60 mb-3">[TECHNOLOGY STACK]</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="text-xs border border-white/40 px-3 py-1.5 tracking-wider">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-75 text-sm tracking-wider"
          >
            VIEW GITHUB
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border-2 border-white bg-white text-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-75 text-sm tracking-wider"
          >
            LIVE DEMO
          </a>
        </div>
      </div>
    </div>
  )
}
