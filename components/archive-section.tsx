"use client"

import { useState } from "react"
import { NeuralBackground } from "./neural-background"
import { getProjectsByCategory } from "@/lib/projects-data"
import { ProjectDetailModal } from "./project-detail-modal"
import type { Project } from "@/types/project"

export function ArchiveSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const hybridProjects = getProjectsByCategory("hybrid")

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden">
      <NeuralBackground opacity={0.06} nodeCount={20} />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 04"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">HYBRID SOLUTIONS</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide max-w-2xl">
            Projects combining ML intelligence with fullstack engineering. Real-world solutions that scale.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {hybridProjects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="w-full border-2 border-white/40 bg-black/60 backdrop-blur-sm hover:border-white transition-all duration-75 group text-left"
            >
              <div className="p-4 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2">
                      [HYBRID_{String(index + 1).padStart(3, "0")}]
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 tracking-wide">{project.name}</h3>
                    <p className="text-xs md:text-base text-white/70 leading-relaxed mb-4 md:mb-6">
                      {project.description}
                    </p>
                  </div>
                </div>

                {project.features && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                    {project.features.slice(0, 3).map((item) => (
                      <div key={item} className="border border-white/40 p-2 md:p-3 text-center text-xs md:text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] md:text-xs text-white/60 tracking-wider mr-2">STACK:</span>
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[10px] md:text-xs border border-white/40 px-2 py-1 tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
