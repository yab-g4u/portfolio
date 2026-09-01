"use client"

import { Cpu, Mic, Layers, Database, ShieldCheck, ArrowRight, GitBranch, Terminal } from "lucide-react"

export function EngineeringSection() {
  const capabilityBlocks = [
    {
      id: "ai-systems",
      title: "AI SYSTEMS",
      icon: Cpu,
      tag: "AGENTS & REASONING",
      summary:
        "Designing deterministic workflows around generative models with strict schema guarantees, context management, and auditability.",
      capabilities: [
        { name: "LLMs & Prompt Engineering", detail: "Structured output parsing, system prompt constraint hardening" },
        { name: "RAG & Vector Retrieval", detail: "Dense embeddings, semantic re-ranking, citation grounding" },
        { name: "Autonomous Multi-Agents", detail: "CrewAI & LangChain orchestration with role specialization" },
        { name: "Structured Extraction", detail: "Zod & Pydantic schema validation preventing malformed JSON" },
        { name: "NLP & Computer Vision", detail: "Phonetic boundary detection, OCR, clinical classification" },
      ],
    },
    {
      id: "voice-systems",
      title: "VOICE & CONVERSATIONAL SYSTEMS",
      icon: Mic,
      tag: "TELEPHONY & AUDIO",
      summary:
        "Connecting traditional PSTN telephony and cellular channels to low-latency AI speech pipelines.",
      capabilities: [
        { name: "Realtime Voice Streaming", detail: "Sub-250ms packet buffering over bi-directional WebSockets" },
        { name: "Telephony & IVR Integration", detail: "Twilio & Asterisk call routing across standard 2G networks" },
        { name: "Speech AI & Whisper ASR", detail: "Streaming transcription resilient to noisy cellular codecs" },
        { name: "Multilingual & Dialect Models", detail: "Audio adaptation for regional accents and multilingual speakers" },
        { name: "VAD & Turn-Taking", detail: "Dynamic voice activity detection state machines" },
      ],
    },
    {
      id: "fullstack",
      title: "FULL-STACK ENGINEERING",
      icon: Layers,
      tag: "WEB & INFRASTRUCTURE",
      summary:
        "Building resilient, accessible user interfaces backed by performant asynchronous APIs and robust databases.",
      capabilities: [
        { name: "React & Next.js 15 (App Router)", detail: "Server Components, dynamic route handlers, clean client state" },
        { name: "TypeScript & Node.js", detail: "End-to-end type safety, AST manipulation, script automation" },
        { name: "Python & FastAPI", detail: "High-throughput asynchronous APIs with OpenAPI documentation" },
        { name: "PostgreSQL & Redis Caching", detail: "Relational modeling, indexing, ACID transactions, rate limiting" },
        { name: "Containerization & Docker", detail: "Standardized environments, microservice orchestration" },
      ],
    },
    {
      id: "ml-engineering",
      title: "ML ENGINEERING",
      icon: Database,
      tag: "MODELS & EXPLAINABILITY",
      summary:
        "Taking models from exploratory notebooks to reproducible training pipelines and production inference APIs.",
      capabilities: [
        { name: "Model Evaluation & Benchmarking", detail: "Cross-validation, ROC/AUC metrics, precision-recall optimization" },
        { name: "Explainability & SHAP", detail: "TreeSHAP feature attributions and compliance audit reporting" },
        { name: "Inference Optimization", detail: "Low-latency API serving, batch processing, memory management" },
        { name: "Data Preprocessing Pipelines", detail: "Feature engineering, class imbalance balancing, outlier handling" },
        { name: "Scikit-Learn & TensorFlow", detail: "Ensemble methods, XGBoost, deep neural architectures" },
      ],
    },
  ]

  return (
    <section id="engineering" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>02 // ARCHITECTURE & CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Build
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed">
            I care about the system behind the interface — how data moves, how AI behaves, how
            failures are handled, and how prototypes become usable products.
          </p>
        </div>

        {/* 4 Capability Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {capabilityBlocks.map((block) => {
            const Icon = block.icon
            return (
              <div
                key={block.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-zinc-700/90 transition-colors backdrop-blur-sm"
              >
                <div className="space-y-4">
                  {/* Block Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-mono font-bold text-white tracking-wide">
                          {block.title}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          {block.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {block.summary}
                  </p>

                  {/* Capabilities Items */}
                  <div className="space-y-2 pt-2">
                    {block.capabilities.map((cap) => (
                      <div
                        key={cap.name}
                        className="p-2.5 rounded-md bg-zinc-950/60 border border-zinc-800/60 space-y-0.5"
                      >
                        <div className="text-xs font-mono font-semibold text-zinc-200">
                          {cap.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                          {cap.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>PRODUCTION_TESTED</span>
                  <span className="text-emerald-400">READY_FOR_SCALE</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
