"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Github } from "lucide-react"

interface SpotlightProject {
  id: string
  number: string
  name: string
  badge: string
  tagline: string
  description: string
  pipeline: {
    step: string
    title: string
    detail: string
  }[]
  metrics: { label: string; value: string }[]
  tech: string[]
  github?: string | null
  demo?: string | null
  journalHref?: string
}

const FAVORITES: SpotlightProject[] = [
  {
    id: "atlas",
    number: "01",
    name: "ATLAS",
    badge: "AI Developer Infrastructure",
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
    journalHref: "/writing/from-hackathon-prototype-to-real-ai-system",
  },
  {
    id: "suno",
    number: "05",
    name: "Suno",
    badge: "Computer Vision & Assistive AI",
    tagline: "Computer vision & gesture tracking helping children establish speech through interactive play.",
    description:
      "An assistive AI interface employing client-side computer vision, real-time facial landmark tracking, and motion kinematics to help children with speech challenges engage in gamified articulation and visual auditory feedback loops.",
    pipeline: [
      {
        step: "01",
        title: "Low-Latency Video Ingest",
        detail: "Captures camera frames locally with WebGL/WASM acceleration directly on the client device.",
      },
      {
        step: "02",
        title: "Landmark & Pose Extraction",
        detail: "Runs lightweight on-device vision models for articulatory facial points and gesture coordinates.",
      },
      {
        step: "03",
        title: "Interactive State Machine",
        detail: "Maps gestural kinematics into interactive target thresholds in responsive real-time loops.",
      },
      {
        step: "04",
        title: "Auditory Feedback Synthesis",
        detail: "Generates phonetic cues and adaptive visual milestones to reinforce verbal communication progress.",
      },
    ],
    metrics: [
      { label: "Execution Budget", value: "33ms Frame Loop" },
      { label: "Architecture", value: "100% Client-Side Vision" },
      { label: "Core Impact", value: "Assistive Speech & Play" },
    ],
    tech: ["Computer Vision", "Pose Estimation", "WebAudio", "Interactive AI", "TypeScript", "React"],
    github: null,
    demo: "https://sunoos.vercel.app/",
    journalHref: "/writing/building-suno-teaching-a-computer-to-understand-human-movement",
  },
]

export function FavoriteSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const currentProject = FAVORITES[activeIndex] || FAVORITES[0]
  const currentPipelineStep = currentProject.pipeline[activeStep] || currentProject.pipeline[0]

  return (
    <section id="spotlight">
      <div className="head">
        <div className="ghost" aria-hidden="true">
          SPOTLIGHT
        </div>
        <small className="rv">Featured systems · 01 — 05</small>
        <h2 className="glow rv">Spotlight</h2>
        <div className="bar" />
        <p className="rv">
          A deeper look at flagship systems spanning developer tools, telecom trust, local IR,
          multi-agent coordination, and assistive computer vision.
        </p>
      </div>

      <div className="tabs" role="tablist" aria-label="Featured Systems">
        {FAVORITES.map((fav, idx) => (
          <button
            key={fav.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            onClick={() => {
              setActiveIndex(idx)
              setActiveStep(0)
            }}
            className={`pill ${idx === activeIndex ? "on" : ""}`}
          >
            {fav.number} {fav.name}
          </button>
        ))}
      </div>

      <div className="spot card g2 rv">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h3>{currentProject.name}</h3>
            <div className="k">{currentProject.badge}</div>
            <p>
              <b>{currentProject.tagline}</b>
            </p>
            <p style={{ marginTop: "12px" }}>{currentProject.description}</p>

            <div className="tgs">
              {currentProject.tech.map((t) => (
                <span key={t} className="tg">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="btns" style={{ justifyContent: "flex-start" }}>
            {currentProject.demo && (
              <a
                className="pill solid"
                href={currentProject.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {currentProject.github && (
              <a
                className="pill"
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            {currentProject.journalHref && (
              <Link className="pill" href={currentProject.journalHref}>
                <BookOpen className="w-4 h-4 text-accent dark:text-[#ffb3b3]" />
                <span>Journal Note</span>
              </Link>
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 font-medium text-[#8f0306] dark:text-[#ffd0d0]">
            Architecture flow &amp; pipeline · click step to inspect
          </p>

          <div className="steps">
            {currentProject.pipeline.map((p, idx) => (
              <button
                key={p.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`step ${idx === activeStep ? "on" : ""}`}
              >
                <small>STEP {p.step}</small>
                {p.title}
              </button>
            ))}
          </div>

          <div className="sdesc">
            <b>
              [{currentPipelineStep.step}] {currentPipelineStep.title}
            </b>
            <br />
            {currentPipelineStep.detail}
            <br />
            <br />
            {currentProject.metrics.map((m, idx) => (
              <span key={m.label}>
                {m.label}: <b>{m.value}</b>
                {idx < currentProject.metrics.length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
