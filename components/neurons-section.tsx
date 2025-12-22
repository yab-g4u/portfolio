"use client"

import { useState } from "react"
import { NeuralBackground } from "./neural-background"
import { getProjectsByCategory } from "@/lib/projects-data"
import { ProjectDetailModal } from "./project-detail-modal"
import type { Project } from "@/types/project"

export function NeuronsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const mlProjects = getProjectsByCategory("ml")

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden">
      <NeuralBackground opacity={0.1} nodeCount={35} />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 02"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">MACHINE LEARNING</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide max-w-2xl">
            Neural networks and AI systems that learn, adapt, and predict. From NLP to computer vision and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {mlProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="border-2 border-white/40 bg-black/60 backdrop-blur-sm p-4 md:p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-75"
            >
              <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2">
                [NODE_{String(project.id).padStart(2, "0")}]
              </div>
              <div className="text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-wide">{project.name}</div>
              <p className="text-xs md:text-sm text-white/70 mb-3 md:mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[8px] md:text-[10px] border border-white/40 px-2 py-1 tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
