"use client"

import { useState } from "react"
import { NeuralBackground } from "./neural-background"
import { AnimatedCounter } from "./animated-counter"
import { getProjectsByCategory } from "@/lib/projects-data"
import { ProjectDetailModal } from "./project-detail-modal"
import type { Project } from "@/types/project"

const techLogos: Record<string, string> = {
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  Vercel: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
}

const stackTree = {
  name: "APPLICATION",
  children: [
    {
      name: "FRONTEND",
      children: [
        { name: "React.js", children: [] },
        { name: "Next.js", children: [] },
        { name: "TypeScript", children: [] },
        { name: "Tailwind CSS", children: [] },
      ],
    },
    {
      name: "BACKEND",
      children: [
        { name: "Node.js", children: [] },
        { name: "Express", children: [] },
        { name: "Python", children: [] },
        { name: "FastAPI", children: [] },
      ],
    },
    {
      name: "DATABASE",
      children: [
        { name: "PostgreSQL", children: [] },
        { name: "MongoDB", children: [] },
        { name: "Redis", children: [] },
      ],
    },
    {
      name: "INFRASTRUCTURE",
      children: [
        { name: "Docker", children: [] },
        { name: "Kubernetes", children: [] },
        { name: "AWS", children: [] },
        { name: "Vercel", children: [] },
      ],
    },
  ],
}

export function LogicSection() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["APPLICATION"]))
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const fullstackProjects = getProjectsByCategory("fullstack")

  const toggleNode = (name: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }
      return newSet
    })
  }

  const renderTree = (node: typeof stackTree, depth = 0) => {
    const isExpanded = expandedNodes.has(node.name)
    const hasChildren = node.children.length > 0
    const logo = techLogos[node.name]

    return (
      <div key={node.name} className="select-none">
        <div
          className={`flex items-center gap-2 py-1 ${hasChildren ? "cursor-pointer" : ""} hover:text-white/80 transition-colors`}
          style={{ paddingLeft: `${depth * 24}px` }}
          onClick={() => hasChildren && toggleNode(node.name)}
        >
          <span className="text-white/60 w-4">{hasChildren ? (isExpanded ? "▼" : "▶") : "━"}</span>
          {logo && <img src={logo || "/placeholder.svg"} alt={node.name} className="w-4 h-4" />}
          <span className="tracking-wide">{node.name}</span>
        </div>
        {isExpanded && node.children.map((child) => renderTree(child, depth + 1))}
      </div>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden bg-gradient-to-b from-black via-black to-black">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-[1]" />

      <NeuralBackground opacity={0.08} nodeCount={25} />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 01"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">FULLSTACK ARCHITECTURE</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide max-w-2xl">
            Building scalable systems with modern frameworks and infrastructure. End-to-end solutions from concept to
            deployment.
          </p>
        </div>

        <div className="border-2 border-white bg-black/80 backdrop-blur-sm p-4 md:p-8 mb-8">
          <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-6">[SYSTEM DEPENDENCY TREE]</div>
          <div className="font-mono text-xs md:text-sm">{renderTree(stackTree)}</div>
        </div>

        <div className="mb-8">
          <div className="text-xs tracking-wider text-white/60 mb-4">[FULLSTACK PROJECTS]</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fullstackProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="border-2 border-white/40 bg-black/60 backdrop-blur-sm p-4 text-left hover:border-white hover:bg-white/5 transition-all duration-75"
              >
                <div className="text-[10px] tracking-wider text-white/60 mb-2">
                  [PROJECT_{String(project.id).padStart(2, "0")}]
                </div>
                <div className="text-lg font-bold mb-2 tracking-wide">{project.name}</div>
                <p className="text-xs text-white/70 mb-3 leading-relaxed">{project.description}</p>
                <div className="flex gap-2">
                  <span className="text-[10px] border border-white/60 px-2 py-1 hover:bg-white hover:text-black transition-colors">
                    VIEW DETAILS
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[
            { label: "PROJECTS", value: "12+" },
            { label: "UPTIME", value: "99.9%" },
            { label: "DEPLOYS", value: "7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-white/40 bg-black/60 backdrop-blur-sm p-3 md:p-6 text-center"
            >
              <AnimatedCounter value={stat.value} />
              <div className="text-[8px] md:text-xs tracking-wider text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
