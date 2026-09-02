"use client"

import { Cpu, Mic, Layers, Terminal } from "lucide-react"

export function WhatIBuild() {
  const domains = [
    {
      title: "AI Systems",
      icon: Cpu,
      description: "Agentic AI orchestration, RAG architectures, machine learning workflows, and intelligent automation.",
      tags: ["Agents", "RAG", "LLMs", "Evaluation"],
    },
    {
      title: "Voice & Conversational Systems",
      icon: Mic,
      description: "Realtime PSTN/2G telephony pipelines, streaming ASR, IVR state machines, and speech interfaces.",
      tags: ["Telephony", "ASR / TTS", "WebSockets", "VAD"],
    },
    {
      title: "Full-Stack Products",
      icon: Layers,
      description: "Production web applications, typed API services, asynchronous queues, and database engines.",
      tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    },
    {
      title: "Developer Tools & Local IR",
      icon: Terminal,
      description: "Zero-cloud search infrastructure, local-first SQLite FTS5/vector indices, and AST code synthesizers.",
      tags: ["Local-First", "BM25", "AST Parsers", "Vector IR"],
    },
  ]

  return (
    <section id="what-i-build" className="py-10 border-t border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            What I build
          </h2>
          <span className="text-[10px] font-mono text-muted-foreground">Engineering Domains</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
          {domains.map((item) => {
            const IconComponent = item.icon
            return (
              <div key={item.title} className="space-y-2 p-3 sm:p-3.5 rounded-lg bg-secondary/25 border border-border/70 hover:border-foreground/20 transition-all">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-secondary text-foreground">
                    <IconComponent className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-secondary/60 text-[10px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
