"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft } from "lucide-react"

const commands = {
  help: `Available commands:
  help       - Show available command list
  projects   - List featured systems & architectures
  omniq      - Deep dive into Voice AI infrastructure
  medscope   - Details on multi-agent epidemic platform
  skills     - Display core engineering capabilities
  experience - View professional history & leadership
  contact    - Print verified contact details
  resume     - Get link to curriculum vitae
  clear      - Clear terminal window
  about      - Engineering philosophy & background`,
  projects: `Featured Systems:
  [01] OMNIQ     - Voice AI for 2G/PSTN feature-phone users (Twilio, Whisper, LLMs)
  [02] MEDSCOPE  - Multi-Agent Epidemic Coordination System (CrewAI, LangChain)
  [03] ATLAS     - Developer Portfolio & AST Code Synthesis Engine
  [04] IDA       - AI Clinical Prescription Safety Monitor (UniHack Winner)
  [05] DATAPILOT - Explainable ML Dashboard with SHAP Interpretability

Type 'omniq' or 'medscope' for deep architecture breakdowns.`,
  omniq: `OMNIQ // VOICE AI INFRASTRUCTURE
Problem: 400M+ feature-phone users in Sub-Saharan Africa cannot access web AI.
Solution: Realtime voice agent connecting standard 2G/PSTN phone calls to LLMs.
Pipeline: PSTN audio -> Twilio Media Streams -> Whisper ASR -> Extraction -> VAD -> Fast Speech.
Key Decision: Streaming 400ms audio chunks over WebSockets to maintain <1.2s turn latency.`,
  medscope: `MEDSCOPE // MULTI-AGENT EPIDEMIC COORDINATION
Problem: Public health crises suffer from isolated data silos and conflicting policies.
Solution: Specialized CrewAI agent network (Epidemiologist, Resource Allocator, Arbiter).
Key Decision: Decentralized role separation prevents single-prompt trade-off bias.`,
  skills: `Core Technical Capabilities:
  • AI Systems: LLMs, RAG, CrewAI, LangChain, Zod schema extraction
  • Voice & Audio: Telephony, Twilio, Whisper ASR, VAD, WebSockets
  • Full-Stack: Next.js 15, React, TypeScript, Python, FastAPI, Node.js
  • Data & ML: Scikit-learn, TensorFlow, SHAP, PostgreSQL, Redis`,
  experience: `Professional Experience:
  • 2026: iCog Labs - AI Talent Program (Machine Learning & Agentic Systems)
  • 2024-Present: GDG AASTU - AI/ML Technical Lead & Instructor
  • 2024-2025: Lyne Creatives - Lead Software Engineer (Microservices & Platform)`,
  contact: `Verified Contact Channels:
  Email: yabkal12345@gmail.com
  GitHub: https://github.com/yab-g4u
  Location: Addis Ababa, Ethiopia`,
  resume: `Direct Résumé Download:
  /cv/YEABSERA-SISAY.pdf`,
  about: `Yeabsera Sisay // AI Engineer & Full-Stack Builder
Background in electromechanical engineering applied to intelligent software.
Focused on auditable, low-latency, and real-world constrained AI systems.`,
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<{ input: string; output: string }[]>([
    {
      input: "welcome",
      output: "YEABSERA SISAY // AI SYSTEM TERMINAL v2.4\nType 'help' to inspect projects, architecture, or contact details.",
    },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, isOpen])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "clear") {
      setHistory([])
      return
    }

    const output =
      commands[trimmedCmd as keyof typeof commands] ||
      `Command not found: '${cmd}'. Type 'help' for available commands.`

    setHistory([...history, { input: cmd, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-300 hover:text-white hover:border-emerald-500/60 hover:bg-zinc-800 text-xs font-mono shadow-xl backdrop-blur-md transition-all group"
        aria-label="Toggle interactive engineering terminal"
      >
        <TerminalIcon className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">CLI_CONSOLE</span>
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[520px] max-w-[calc(100vw-2rem)] h-[380px] rounded-xl border border-zinc-800 bg-[#09090b]/95 backdrop-blur-xl z-50 flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-zinc-200 font-semibold">cli.yeabsera.internal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistory([])}
                className="text-[10px] text-zinc-500 hover:text-zinc-300"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                aria-label="Close terminal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Log */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-4 text-xs font-mono space-y-3 text-zinc-300"
          >
            {history.map((entry, index) => (
              <div key={index} className="space-y-1">
                {entry.input !== "welcome" && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span>$</span>
                    <span className="text-white">{entry.input}</span>
                  </div>
                )}
                <div className="text-zinc-300 whitespace-pre-line pl-3 border-l border-zinc-800/80 leading-relaxed">
                  {entry.output}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleSubmit} className="border-t border-zinc-800/80 bg-zinc-900/40">
            <div className="flex items-center gap-2 px-4 py-2.5">
              <span className="text-emerald-400 font-mono text-xs">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs placeholder:text-zinc-600"
                placeholder="Type 'help', 'projects', 'omniq', 'skills'..."
              />
              <button type="submit" className="text-zinc-500 hover:text-emerald-400">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
