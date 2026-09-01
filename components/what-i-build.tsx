"use client"

export function WhatIBuild() {
  const domains = [
    {
      title: "AI Systems",
      description: "Agentic AI, machine learning, RAG, intelligent automation",
    },
    {
      title: "Voice & Conversational Systems",
      description: "Realtime voice agents, IVR, speech interfaces, multilingual systems",
    },
    {
      title: "Full-Stack Products",
      description: "React, Next.js, Python, FastAPI, PostgreSQL, Supabase",
    },
    {
      title: "Developer Tools",
      description: "Search infrastructure, AI-assisted developer workflows, local-first systems",
    },
  ]

  return (
    <section className="py-10 border-t border-border">
      <div className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          What I build
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          {domains.map((item) => (
            <div key={item.title} className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
