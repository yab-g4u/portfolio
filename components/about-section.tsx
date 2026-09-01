"use client"

import { User, Cpu, Sparkles, BookOpen, Compass, ArrowUpRight, Terminal, CheckCircle2 } from "lucide-react"

export function AboutSection() {
  const currentFocus = [
    {
      label: "BUILDING",
      text: "Voice AI infrastructure, autonomous agent orchestration, and auditable full-stack products.",
      icon: Cpu,
    },
    {
      label: "LEARNING",
      text: "Low-latency streaming audio pipelines, Asterisk telephony clustering, and dynamic VAD models.",
      icon: BookOpen,
    },
    {
      label: "EXPLORING",
      text: "Voice interfaces for resource-constrained offline environments and deterministic LLM execution guarantees.",
      icon: Compass,
    },
  ]

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>05 // ABOUT & PERSPECTIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base font-normal">
            <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
              I&apos;m Yeabsera, an engineer focused on building AI-powered systems and full-stack
              products. I enjoy working on problems where the constraints are messy, the users are
              real, and the solution requires more than an API call.
            </p>

            <p>
              My background in electromechanical engineering influences how I approach software: I
              like understanding the entire system, not just the interface. From signal transduction
              and physical latency to distributed databases and language model inference, I design
              software with end-to-end feedback loops in mind.
            </p>

            <p>
              Whether engineering voice AI for users on 2G feature phones across Sub-Saharan Africa
              or building multi-agent epidemic response networks, I prioritize deterministic
              reliability, source evidence attribution, and clean developer ergonomics.
            </p>

            {/* Quick Principles */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <h4 className="font-mono text-xs font-bold text-zinc-200 uppercase tracking-wider">
                CORE ENGINEERING VALUES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/70 space-y-1">
                  <div className="text-xs font-mono font-semibold text-emerald-400">01. Auditable Output</div>
                  <p className="text-[11px] text-zinc-400">Every generative deduction must trace to verifiable evidence.</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/70 space-y-1">
                  <div className="text-xs font-mono font-semibold text-emerald-400">02. Low Latency Budgets</div>
                  <p className="text-[11px] text-zinc-400">Voice and streaming interactions demand sub-second responsiveness.</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/70 space-y-1">
                  <div className="text-xs font-mono font-semibold text-emerald-400">03. Systems Over Glitz</div>
                  <p className="text-[11px] text-zinc-400">Resilient error handling and clear state beats flashy superficial UI.</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/70 space-y-1">
                  <div className="text-xs font-mono font-semibold text-emerald-400">04. Real-World Constraints</div>
                  <p className="text-[11px] text-zinc-400">Design for actual users, poor connectivity, and edge conditions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Currently / Now Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CURRENTLY // NOW</span>
                </div>
                <span className="text-zinc-500">Q1 2026</span>
              </div>

              <div className="space-y-4">
                {currentFocus.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="p-3.5 rounded-lg bg-zinc-950/60 border border-zinc-800/70 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono text-xs font-bold text-zinc-200">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pl-5 font-normal">
                        {item.text}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Location: Addis Ababa, Ethiopia</span>
                <span className="text-emerald-400">UTC+3 (EAT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
