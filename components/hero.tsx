"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowRight, Download, Mic, FileCode, Cpu, Layers, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export function Hero() {
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0)
  const [packetPosition, setPacketPosition] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineStage((prev) => (prev + 1) % 3)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const anim = setInterval(() => {
      setPacketPosition((p) => (p >= 100 ? 0 : p + 2))
    }, 40)
    return () => clearInterval(anim)
  }, [])

  const pipelineStages = [
    {
      title: "INPUT LAYER",
      tag: "REAL-WORLD SIGNALS",
      icon: Mic,
      items: [
        { label: "PSTN / 2G Voice", detail: "Twilio telephony & IVR streams" },
        { label: "Unstructured Data", detail: "Clinical records & raw PDF docs" },
        { label: "Event Signals", detail: "Epidemic curves & financial logs" },
      ],
    },
    {
      title: "INTELLIGENCE ENGINE",
      tag: "MODELS & REASONING",
      icon: Cpu,
      items: [
        { label: "Realtime Speech AI", detail: "Whisper ASR + VAD segmentation" },
        { label: "Autonomous Agents", detail: "CrewAI role-decomposed networks" },
        { label: "Explainable ML", detail: "SHAP attribution & TreeEnsembles" },
      ],
    },
    {
      title: "ACTION & AUDIT",
      tag: "DETERMINISTIC VALUE",
      icon: ShieldCheck,
      items: [
        { label: "Auditable Schemas", detail: "Timestamped evidence attribution" },
        { label: "Microservice Sync", detail: "FastAPI REST & WebSocket pushes" },
        { label: "Live Deployment", detail: "Resilient Next.js client systems" },
      ],
    },
  ]

  return (
    <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 overflow-hidden">
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Positioning & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to ambitious AI engineering opportunities</span>
            </div>

            {/* Core Titles */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
                AI Engineer
                <br />
                <span className="text-zinc-400 font-semibold">& Full-Stack Builder</span>
              </h1>
            </div>

            {/* Supporting Pitch */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal">
              I build AI systems that turn messy real-world problems into working products.
            </p>

            {/* Secondary Domain Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-300">Agents</span>
              <span className="text-zinc-600">·</span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-300">Voice AI</span>
              <span className="text-zinc-600">·</span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-300">Machine Learning</span>
              <span className="text-zinc-600">·</span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-300">Full-Stack Systems</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-all shadow-sm group"
              >
                <span>View my work</span>
                <ArrowRight className="w-4 h-4 text-zinc-900 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="/cv/YEABSERA-SISAY.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-zinc-900/90 text-zinc-200 border border-zinc-700/80 font-medium text-sm hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download résumé</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Systems Architecture Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-zinc-800/90 bg-zinc-950/70 p-5 backdrop-blur-md shadow-2xl overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-200 font-semibold">SYSTEM_PIPELINE.ARCH</span>
                </div>
                <div className="text-zinc-500">LATENCY: &lt;1.2s</div>
              </div>

              {/* System Stages Visualizer */}
              <div className="space-y-3 relative">
                {pipelineStages.map((stage, idx) => {
                  const Icon = stage.icon
                  const isActive = activePipelineStage === idx
                  return (
                    <div
                      key={stage.title}
                      onClick={() => setActivePipelineStage(idx)}
                      className={`cursor-pointer transition-all duration-300 p-3.5 rounded-lg border text-left ${
                        isActive
                          ? "bg-zinc-900/90 border-emerald-500/50 shadow-sm shadow-emerald-950/30"
                          : "bg-zinc-900/30 border-zinc-800/60 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded ${
                              isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold tracking-wider text-zinc-200 block">
                              {stage.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">{stage.tag}</span>
                          </div>
                        </div>
                        {isActive && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                            LIVE_EXEC
                          </span>
                        )}
                      </div>

                      {/* Items list */}
                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        {stage.items.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between text-[11px] font-mono bg-zinc-950/40 px-2 py-1 rounded border border-zinc-800/40"
                          >
                            <span className="text-zinc-300 font-medium">{item.label}</span>
                            <span className="text-zinc-500 text-[10px]">{item.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bottom Telemetry Status */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Zap className="w-3 h-3" />
                  <span>DETERMINISTIC GROUNDING</span>
                </div>
                <span>EVIDENCE_TRACE: 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
