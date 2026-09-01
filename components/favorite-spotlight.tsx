"use client"

import { useState } from "react"
import { ArrowUpRight, Github, Sparkles, Terminal, ShieldCheck, Search, Activity, Cpu } from "lucide-react"

interface FavoriteProject {
  id: string
  number: string
  name: string
  badge: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  tagline: string
  description: string
  pipeline: {
    step: string
    title: string
    detail: string
  }[]
  metrics: { label: string; value: string }[]
  tech: string[]
  github: string
  demo?: string | null
}

const FAVORITES: FavoriteProject[] = [
  {
    id: "atlas",
    number: "01",
    name: "ATLAS",
    badge: "AI Developer Infrastructure",
    category: "Code Intelligence & Portfolio Compiler",
    icon: Sparkles,
    tagline: "Turns GitHub repositories and career data into production-ready portfolios.",
    description:
      "ATLAS eliminates manual portfolio crafting by executing deep semantic code analysis across your GitHub repositories and ingested resumes. It reconstructs architectural competence, generates bespoke React components, and provisions instant deployments.",
    pipeline: [
      {
        step: "01",
        title: "AST & Repo Ingestion",
        detail: "Parses AST tree, commits, language ratios, and system dependencies across all public repositories.",
      },
      {
        step: "02",
        title: "Semantic Skill Mapping",
        detail: "Extracts implicit architecture skills, systems design depth, and project milestones via LLMs.",
      },
      {
        step: "03",
        title: "Bespoke Code Synthesis",
        detail: "Synthesizes modern Next.js/Tailwind UI layouts adhering to professional design systems.",
      },
      {
        step: "04",
        title: "Autonomous Deployment",
        detail: "Pushes verified source to Vercel/Cloud edge with automatic DNS routing in under 45 seconds.",
      },
    ],
    metrics: [
      { label: "Pipeline Speed", value: "< 45s Deploy" },
      { label: "Analysis Mode", value: "Full AST & Commit History" },
      { label: "Output", value: "Next.js + Tailwind App" },
    ],
    tech: ["TypeScript", "Next.js", "GitHub API", "OpenAI", "Tailwind CSS", "Vercel SDK"],
    github: "https://github.com/yab-g4u/attlas",
    demo: "https://attlas-nu.vercel.app/",
  },
  {
    id: "shieldguard",
    number: "02",
    name: "ShieldGuard",
    badge: "Telecom AI & Security",
    category: "Network-Level Fraud Mitigation",
    icon: ShieldCheck,
    tagline: "Telecom trust orchestration using GSMA CAMARA APIs for African fintech.",
    description:
      "Built for the realities of Sub-Saharan Africa's digital economy. ShieldGuard queries carrier-grade Open Gateway signals (SIM Swap timestamps, cell-site geolocations, and KYC status) to stop SIM-swap fraud and account takeovers before mobile money leaves the account.",
    pipeline: [
      {
        step: "01",
        title: "CAMARA Signal Intercept",
        detail: "Directly queries telco carrier network APIs for SIM swap age and cellular roaming status.",
      },
      {
        step: "02",
        title: "Location Match & Handoff",
        detail: "Cross-checks device cell-tower coordinates against incoming transactional IP clusters.",
      },
      {
        step: "03",
        title: "Risk Scoring Engine",
        detail: "Applies real-time ML decision boundary (<80ms latency) to detect anomalous transactions.",
      },
      {
        step: "04",
        title: "Gateway Enforcement",
        detail: "Auto-prompts step-up biometrics or locks unauthorized mobile money transfers immediately.",
      },
    ],
    metrics: [
      { label: "Standard", value: "GSMA CAMARA Open Gateway" },
      { label: "Mitigation Latency", value: "< 80ms Carrier Hook" },
      { label: "Target Sector", value: "Mobile Money & African Fintech" },
    ],
    tech: ["CAMARA APIs", "FastAPI", "Python", "Telecom AI", "Fintech Security", "TypeScript"],
    github: "https://github.com/yab-g4u/shield-guard.git",
    demo: "https://shieldguard.vercel.app/",
  },
  {
    id: "surf",
    number: "03",
    name: "Surf",
    badge: "Local-First / Information Retrieval",
    category: "Zero-Cloud Developer Search Engine",
    icon: Search,
    tagline: "Local-first hybrid search engine for developer data with zero hosted LLMs.",
    description:
      "A privacy-first personal search engine across Reddit, Telegram, Devpost, X, and LinkedIn data dumps. Uses SQLite FTS5 BM25 lexical ranking coupled with local sentence-transformer vector embeddings, merged via Reciprocal Rank Fusion (RRF) on your local CPU.",
    pipeline: [
      {
        step: "01",
        title: "Zero-Cloud Ingest",
        detail: "Loads JSON/CSV raw data dumps directly from your device with complete local privacy.",
      },
      {
        step: "02",
        title: "Dual Index Generation",
        detail: "Constructs SQLite FTS5 full-text tables and local 384-dim sentence embeddings concurrently.",
      },
      {
        step: "03",
        title: "Reciprocal Rank Fusion",
        detail: "Merges BM25 keyword matching with dense cosine similarity using calibrated RRF weighting.",
      },
      {
        step: "04",
        title: "Instant Sub-20ms Queries",
        detail: "Executes searches locally in SQLite with zero network hops and zero cloud token expenditures.",
      },
    ],
    metrics: [
      { label: "Privacy Model", value: "100% Local / Offline" },
      { label: "Index Engine", value: "SQLite FTS5 + MiniLM Vectors" },
      { label: "Fusion Algorithm", value: "Reciprocal Rank Fusion (RRF)" },
    ],
    tech: ["Python", "SQLite FTS5", "Sentence-Transformers", "BM25 Lexical", "Vector RRF", "FastAPI"],
    github: "https://github.com/yab-g4u/surf.git",
    demo: null,
  },
  {
    id: "medscope",
    number: "04",
    name: "Medscope",
    badge: "Multi-Agent Systems & Health AI",
    category: "Epidemic Coordination & Simulation",
    icon: Activity,
    tagline: "Multi-agent epidemic coordination system with verifiable policy execution.",
    description:
      "Combines mathematical SEIR disease outbreak modeling with a swarm of specialized AI agents (Policy, Medical Logistics, and Public Sentiment). Awarded 2nd Place in the African Blockchain Championship for immutable public health coordination.",
    pipeline: [
      {
        step: "01",
        title: "SEIR Dynamic Simulation",
        detail: "Solves stochastic epidemiological differential equations to project localized infection curves.",
      },
      {
        step: "02",
        title: "Multi-Agent Consensus",
        detail: "Autonomous agent swarm negotiates trade-offs between hospital capacity, supply chains, and public sentiment.",
      },
      {
        step: "03",
        title: "Logistics Optimization",
        detail: "Calculates optimal redistribution of medical personnel, oxygen reserves, and vaccines.",
      },
      {
        step: "04",
        title: "Blockchain Audit Anchor",
        detail: "Writes emergency response actions and resource transfers to immutable ledgers for transparent auditing.",
      },
    ],
    metrics: [
      { label: "Distinction", value: "2nd Place African Blockchain Champ" },
      { label: "Core Model", value: "SEIR Stochastic Outbreak Math" },
      { label: "Coordination", value: "Autonomous Multi-Agent Swarm" },
    ],
    tech: ["CrewAI", "Multi-Agent Systems", "Python", "SEIR Modeling", "Blockchain", "FastAPI"],
    github: "https://github.com/yab-g4u/medscop.git",
    demo: "https://medscop.vercel.app/",
  },
]

export function FavoriteSpotlight() {
  const [activeTab, setActiveTab] = useState<string>("atlas")
  const [activeStep, setActiveStep] = useState<number>(0)

  const currentProject = FAVORITES.find((p) => p.id === activeTab) || FAVORITES[0]
  const IconComponent = currentProject.icon

  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Featured systems
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-foreground font-semibold">
              Spotlight
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            A deeper look at four flagship projects spanning developer tools, telecom trust, local IR, and multi-agent coordination.
          </p>
        </div>

        {/* Tab Navigation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FAVORITES.map((fav) => {
            const isSelected = fav.id === activeTab
            return (
              <button
                key={fav.id}
                onClick={() => {
                  setActiveTab(fav.id)
                  setActiveStep(0)
                }}
                className={`p-3 text-left rounded-md border transition-all ${
                  isSelected
                    ? "bg-secondary border-foreground/30 shadow-xs"
                    : "bg-secondary/30 border-border hover:bg-secondary/60 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {fav.number}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-accent" : "bg-muted-foreground/30"
                    }`}
                  />
                </div>
                <div className="text-sm font-semibold text-foreground truncate">
                  {fav.name}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground truncate pt-0.5">
                  {fav.badge.split(" / ")[0]}
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Project Console Box */}
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-6 shadow-xs">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-secondary border border-border text-foreground">
                  <IconComponent className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {currentProject.name}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/80 border border-border text-muted-foreground">
                  {currentProject.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                {currentProject.tagline}
              </p>
            </div>

            {/* Direct Action Links */}
            <div className="flex items-center gap-2 shrink-0">
              {currentProject.demo && (
                <a
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span>Live App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {currentProject.description}
          </p>

          {/* Interactive Pipeline Architecture Diagram */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-accent" />
                <span>Architecture flow & pipeline</span>
              </span>
              <span className="text-[10px] text-muted-foreground/80">Click step to inspect</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentProject.pipeline.map((p, idx) => {
                const isActive = activeStep === idx
                return (
                  <button
                    key={p.step}
                    onClick={() => setActiveStep(idx)}
                    className={`p-2.5 rounded-md text-left border transition-all ${
                      isActive
                        ? "bg-secondary border-accent/60 shadow-xs"
                        : "bg-secondary/20 border-border/70 hover:bg-secondary/40 text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={isActive ? "text-accent font-semibold" : "text-muted-foreground"}>
                        STEP {p.step}
                      </span>
                      {isActive && <Cpu className="w-3 h-3 text-accent" />}
                    </div>
                    <div className="text-xs font-semibold text-foreground truncate">
                      {p.title}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Step Details Panel */}
            <div className="p-3 rounded-md bg-secondary/40 border border-border/80 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-accent text-[11px] font-semibold">
                  [{currentProject.pipeline[activeStep]?.step}] {currentProject.pipeline[activeStep]?.title}
                </span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {currentProject.pipeline[activeStep]?.detail}
              </p>
            </div>
          </div>

          {/* Metrics & Technical Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border">
            {currentProject.metrics.map((m) => (
              <div key={m.label} className="p-2.5 rounded bg-secondary/20 border border-border/60 space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  {m.label}
                </div>
                <div className="text-xs font-semibold text-foreground">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-muted-foreground mr-1">Stack:</span>
            {currentProject.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-secondary text-[11px] font-mono text-foreground border border-border/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
