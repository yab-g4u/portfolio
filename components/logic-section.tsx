"use client"

import { useState } from "react"
import { NeuralBackground } from "./neural-background"

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

    return (
      <div key={node.name} className="select-none">
        <div
          className={`flex items-center gap-2 py-1 ${hasChildren ? "cursor-pointer" : ""} hover:text-white/80 transition-colors`}
          style={{ paddingLeft: `${depth * 24}px` }}
          onClick={() => hasChildren && toggleNode(node.name)}
        >
          <span className="text-white/60 w-4">{hasChildren ? (isExpanded ? "▼" : "▶") : "━"}</span>
          <span className="tracking-wide">{node.name}</span>
        </div>
        {isExpanded && node.children.map((child) => renderTree(child, depth + 1))}
      </div>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden">
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

        <div className="border-2 border-white bg-black/80 backdrop-blur-sm p-4 md:p-8">
          <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-6">[SYSTEM DEPENDENCY TREE]</div>
          <div className="font-mono text-xs md:text-sm">{renderTree(stackTree)}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 md:mt-8">
          {[
            { label: "PROJECTS", value: "12+" },
            { label: "UPTIME", value: "99.9%" },
            { label: "DEPLOYS", value: "7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-white/40 bg-black/60 backdrop-blur-sm p-3 md:p-6 text-center"
            >
              <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{stat.value}</div>
              <div className="text-[8px] md:text-xs tracking-wider text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
