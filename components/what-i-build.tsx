"use client"

const DOMAINS = [
  {
    title: "AI Systems",
    description:
      "Agentic AI orchestration, RAG architectures, machine learning workflows, and intelligent automation.",
    tags: ["Agents", "RAG", "LLMs", "Evaluation"],
  },
  {
    title: "Voice & Conversational Systems",
    description:
      "Realtime PSTN/2G telephony pipelines, streaming ASR, IVR state machines, and speech interfaces.",
    tags: ["Telephony", "ASR / TTS", "WebSockets", "VAD"],
  },
  {
    title: "Full-Stack Products",
    description:
      "Production web applications, typed API services, asynchronous queues, and database engines.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    title: "Developer Tools & Local IR",
    description:
      "Zero-cloud search infrastructure, local-first SQLite FTS5/vector indices, and AST code synthesizers.",
    tags: ["Local-First", "BM25", "AST Parsers", "Vector IR"],
  },
]

export function WhatIBuild() {
  return (
    <section id="what-i-build">
      <div className="head">
        <div className="ghost" aria-hidden="true">
          DOMAINS
        </div>
        <small className="rv">What I build</small>
        <h2 className="glow rv">Engineering Domains</h2>
        <div className="bar" />
      </div>

      <div className="grid-cards">
        {DOMAINS.map((domain, idx) => (
          <div
            key={domain.title}
            className={`dom card ${idx % 2 ? "g3" : "g4"} rv`}
          >
            <h3>{domain.title}</h3>
            <p>{domain.description}</p>
            <div className="tgs">
              {domain.tags.map((tag) => (
                <span key={tag} className="tg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
