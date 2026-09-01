"use client"

import { useState } from "react"
import { BookOpen, ArrowRight, X, Sparkles, Lightbulb, FileText, CheckCircle2 } from "lucide-react"

interface Note {
  id: string
  title: string
  question: string
  relatedProject: string
  relatedProjectLink: string
  tag: string
  takeaway: string
  fullContent: string
}

export function EngineeringNotes() {
  const [activeNote, setActiveNote] = useState<Note | null>(null)

  const notes: Note[] = [
    {
      id: "voice-ai-offline",
      title: "Building AI for users without smartphones",
      question: "What changes when your interface is a phone call instead of a web application?",
      relatedProject: "Omniq",
      relatedProjectLink: "#work",
      tag: "VOICE ARCHITECTURE",
      takeaway:
        "When there is no visual feedback loop, latency budgets shrink drastically. You must design streaming VAD state machines and audio-grounded confirmation steps.",
      fullContent:
        "On web interfaces, users tolerate latency spinners or skeleton screens. On a live telephone call, any silence over 1.5 seconds creates friction and causes users to hang up. When building voice AI for 2G/PSTN networks, audio codecs (like AMR-NB) introduce heavy compression artifacts. We discovered that streaming small 400ms audio buffers into acoustic boundary detectors, combined with dynamic voice-activity thresholds, allows natural conversational turn-taking without needing high-bandwidth smartphones.",
    },
    {
      id: "auditable-outputs",
      title: "Making AI outputs auditable",
      question: "Why extracted information should be traceable back to its evidence.",
      relatedProject: "Omniq",
      relatedProjectLink: "#work",
      tag: "DETERMINISTIC SYSTEMS",
      takeaway:
        "In critical healthcare, legal, or financial contexts, probabilistic outputs are unacceptable without millisecond-level source attribution.",
      fullContent:
        "LLMs can generate persuasive JSON schemas that look correct but contain subtle hallucinations. By enforcing an 'evidence-first' pipeline—where every extracted parameter is linked to an exact audio millisecond timestamp or raw text character offset—human auditors can verify extraction in one click. If the underlying evidence span does not support the extracted attribute with high cosine confidence, the workflow fails gracefully to a human fallback.",
    },
    {
      id: "multi-agent-orchestration",
      title: "Designing multi-agent systems",
      question: "When specialized agents are more useful than one giant prompt.",
      relatedProject: "Medscope",
      relatedProjectLink: "#work",
      tag: "AGENTIC WORKFLOWS",
      takeaway:
        "Single large prompts blur conflicting priorities. Role-decomposed adversarial agents surface blind spots and yield superior consensus.",
      fullContent:
        "When modeling complex problems like pandemic logistics, a single monolithic prompt inevitably averages out critical trade-offs between economic disruption and infection suppression. By configuring specialized CrewAI agents with conflicting reward objectives (e.g. an Epidemiologist maximizing containment vs. a Logistics Director minimizing supply chain paralysis), and orchestrating them through an Arbiter agent, we produce realistic, multi-perspective policy recommendations.",
    },
    {
      id: "repo-to-product",
      title: "Turning repositories into products",
      question: "Designing deterministic workflows around generative AI.",
      relatedProject: "ATLAS",
      relatedProjectLink: "#work",
      tag: "DEVELOPER TOOLS",
      takeaway:
        "Generative models excel at synthesis, but software compilation requires 100% determinism. Code analysis must start with AST parsing.",
      fullContent:
        "Scraping raw Readme markdown is insufficient because documentation drifts from reality. By combining deterministic Abstract Syntax Tree (AST) parsing of package dependencies, route manifests, and database models with targeted LLM case study synthesis, ATLAS reliably extracts true systems engineering accomplishments without hallucinating unverified libraries or fake metrics.",
    },
  ]

  return (
    <section id="notes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>03 // SYSTEMS THINKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Notes
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Technical reflections and architectural lessons from shipping AI systems.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className="cursor-pointer group p-6 sm:p-7 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:border-zinc-700/90 transition-all duration-200 flex flex-col justify-between space-y-5 backdrop-blur-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    {note.tag}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    Related: {note.relatedProject}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {note.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 italic">
                  &ldquo;{note.question}&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                  {note.takeaway}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">Read engineering note</span>
                <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Expand →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Detail Modal */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded">
                  {activeNote.tag}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Project: {activeNote.relatedProject}
                </span>
              </div>
              <button
                onClick={() => setActiveNote(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeNote.title}
              </h3>
              <p className="text-sm font-medium text-emerald-400 italic">
                &ldquo;{activeNote.question}&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>{activeNote.fullContent}</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href={activeNote.relatedProjectLink}
                onClick={() => setActiveNote(null)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>View {activeNote.relatedProject} Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveNote(null)}
                className="px-4 py-1.5 rounded-md bg-zinc-800 text-zinc-200 text-xs font-mono hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
