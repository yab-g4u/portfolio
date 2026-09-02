"use client"

import React from "react"

interface ProjectVisualProps {
  id: string
  name: string
  className?: string
}

export function ProjectVisual({ id, name, className = "" }: ProjectVisualProps) {
  const normId = id.toLowerCase()

  return (
    <div
      className={`relative w-full h-32 sm:h-36 rounded-md overflow-hidden bg-secondary/40 border border-border/80 flex items-center justify-center select-none group-hover:border-foreground/20 transition-all ${className}`}
      aria-label={`Visual diagram for ${name}`}
    >
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/60 via-transparent to-transparent opacity-60" />
      
      {/* Project-specific visual SVGs */}
      {normId.includes("omniq") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* 2G / Telephony Waveform & Streaming Packet Nodes */}
          <path
            d="M20 60 Q 45 20, 70 60 T 120 60 T 170 60 T 220 60 T 270 60 L 300 60"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            className="opacity-30"
          />
          {/* Realtime voice amplitude bars */}
          <rect x="50" y="45" width="4" height="30" rx="2" fill="currentColor" className="opacity-40 animate-pulse" />
          <rect x="62" y="30" width="4" height="60" rx="2" fill="currentColor" className="text-accent opacity-90" />
          <rect x="74" y="20" width="4" height="80" rx="2" fill="currentColor" className="text-accent opacity-90" />
          <rect x="86" y="38" width="4" height="44" rx="2" fill="currentColor" className="text-accent opacity-80" />
          <rect x="98" y="48" width="4" height="24" rx="2" fill="currentColor" className="opacity-40" />

          {/* PSTN / Audio Node */}
          <circle cx="150" cy="60" r="14" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
          <circle cx="150" cy="60" r="6" fill="currentColor" className="text-accent animate-ping opacity-30" />
          <circle cx="150" cy="60" r="3" fill="currentColor" className="text-accent" />

          {/* Structured JSON Stream Out */}
          <path d="M165 60 H 220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-accent" />
          <rect x="220" y="40" width="75" height="40" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
          <text x="230" y="56" fill="currentColor" fontSize="8" fontFamily="monospace" className="font-semibold">
            JSON.schema
          </text>
          <text x="230" y="70" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">
            {"{ dial: 2G }"}
          </text>
        </svg>
      )}

      {normId.includes("medscope") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* Dynamic Epidemic Outbreak Curve & Multi-Agent Swarm */}
          <path
            d="M20 95 C 60 95, 80 85, 110 35 C 130 5, 160 40, 200 80 C 240 92, 280 95, 300 95"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-accent"
          />
          <path
            d="M20 95 C 60 95, 80 85, 110 35 C 130 5, 160 40, 200 80 C 240 92, 280 95, 300 95 L 300 95 L 20 95"
            fill="currentColor"
            fillOpacity="0.06"
          />
          {/* Agent Swarm Nodes */}
          <g transform="translate(60, 40)">
            <circle cx="0" cy="0" r="7" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
            <text x="12" y="3" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.8">Policy Agent</text>
          </g>
          <g transform="translate(140, 22)">
            <circle cx="0" cy="0" r="8" stroke="currentColor" strokeWidth="1.5" className="text-accent" fill="currentColor" fillOpacity="0.2" />
            <text x="13" y="3" fill="currentColor" fontSize="7" fontFamily="monospace" className="font-semibold">Logistics Swarm</text>
          </g>
          <g transform="translate(210, 55)">
            <circle cx="0" cy="0" r="7" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
            <text x="12" y="3" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.8">Sentiment Engine</text>
          </g>
          <line x1="60" y1="40" x2="140" y2="22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          <line x1="140" y1="22" x2="210" y2="55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        </svg>
      )}

      {normId.includes("atlas") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* AST Tree to Production Edge Component Pipeline */}
          <rect x="25" y="38" width="55" height="44" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
          <text x="35" y="56" fill="currentColor" fontSize="8" fontFamily="monospace" className="font-bold">AST.parse</text>
          <text x="35" y="68" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">repo_tree</text>

          <path d="M80 60 H 130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-accent" />
          <polygon points="128,57 134,60 128,63" fill="currentColor" className="text-accent" />

          {/* Semantic LLM Synthesis Node */}
          <g transform="translate(160, 60)">
            <rect x="-24" y="-22" width="48" height="44" rx="6" stroke="currentColor" strokeWidth="1.4" className="text-accent" fill="currentColor" fillOpacity="0.12" />
            <text x="0" y="-3" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">LLM</text>
            <text x="0" y="10" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">Synth</text>
          </g>

          <path d="M185 60 H 235" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-accent" />
          <polygon points="233,57 239,60 233,63" fill="currentColor" className="text-accent" />

          {/* Vercel / Edge UI Output */}
          <rect x="238" y="38" width="60" height="44" rx="4" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
          <text x="248" y="56" fill="currentColor" fontSize="8" fontFamily="monospace" className="font-bold">Next.js</text>
          <text x="248" y="68" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">&lt;45s Deploy</text>
        </svg>
      )}

      {normId.includes("shieldguard") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* Telecom CAMARA Cell Signals & Security Shield */}
          <g transform="translate(60, 60)">
            <path d="M0 25 L 0 -15 M-10 -10 L 0 -25 L 10 -10 M-8 0 L 0 -15 L 8 0 M-14 10 L 0 -15 L 14 10" stroke="currentColor" strokeWidth="1.4" />
            <text x="0" y="38" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">CAMARA Tower</text>
          </g>

          {/* Radiating Waves */}
          <path d="M75 45 A 25 25 0 0 1 75 75" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" className="text-accent opacity-60" />
          <path d="M85 35 A 40 40 0 0 1 85 85" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" className="text-accent opacity-40" />

          {/* Security Shield Decision Matrix */}
          <g transform="translate(190, 60)">
            <path
              d="M0 -30 L 26 -18 V 6 C 26 22, 0 32, 0 32 C 0 32, -26 22, -26 6 V -18 Z"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-accent"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path d="M-8 2 L -2 8 L 10 -4" stroke="currentColor" strokeWidth="2" className="text-accent" strokeLinecap="round" strokeLinejoin="round" />
            <text x="0" y="44" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" className="font-semibold">
              SIM-Swap Safe
            </text>
          </g>

          {/* Sub-80ms Latency Badge */}
          <rect x="235" y="45" width="65" height="28" rx="4" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
          <text x="242" y="62" fill="currentColor" fontSize="8" fontFamily="monospace" className="font-mono text-accent">
            &lt; 80ms hook
          </text>
        </svg>
      )}

      {normId.includes("surf") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* SQLite FTS5 BM25 + Local Sentence Transformers RRF Fusion */}
          <g transform="translate(55, 38)">
            <rect x="0" y="0" width="70" height="24" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
            <text x="8" y="16" fill="currentColor" fontSize="8" fontFamily="monospace">FTS5 BM25</text>
          </g>
          <g transform="translate(55, 70)">
            <rect x="0" y="0" width="70" height="24" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
            <text x="8" y="16" fill="currentColor" fontSize="8" fontFamily="monospace">MiniLM 384d</text>
          </g>

          {/* Convergence lines into RRF */}
          <path d="M125 50 L 165 60" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" className="text-accent" />
          <path d="M125 82 L 165 60" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" className="text-accent" />

          {/* RRF Matrix Node */}
          <g transform="translate(200, 60)">
            <circle cx="0" cy="0" r="22" stroke="currentColor" strokeWidth="1.6" className="text-accent" fill="currentColor" fillOpacity="0.1" />
            <text x="0" y="-3" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">RRF</text>
            <text x="0" y="9" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">Fusion</text>
          </g>

          <g transform="translate(240, 50)">
            <text x="0" y="10" fill="currentColor" fontSize="8" fontFamily="monospace" className="font-semibold text-accent">
              100% Local
            </text>
            <text x="0" y="22" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">
              Sub-20ms IR
            </text>
          </g>
        </svg>
      )}

      {normId.includes("suno") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* Computer Vision Landmark Mesh & Articulatory Speech Tracking */}
          <g transform="translate(80, 60)">
            <ellipse cx="0" cy="0" rx="28" ry="34" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
            {/* Landmark Points */}
            <circle cx="-10" cy="-8" r="2" fill="currentColor" className="text-accent" />
            <circle cx="10" cy="-8" r="2" fill="currentColor" className="text-accent" />
            <circle cx="0" cy="4" r="2" fill="currentColor" className="text-accent" />
            <path d="M-8 14 Q 0 20, 8 14" stroke="currentColor" strokeWidth="1.5" className="text-accent" fill="none" />
            <line x1="-10" y1="-8" x2="0" y2="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            <line x1="10" y1="-8" x2="0" y2="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            <line x1="0" y1="4" x2="-8" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            <line x1="0" y1="4" x2="8" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
          </g>

          <path d="M120 60 H 180" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" className="text-accent" />

          {/* Interactive Speech Play Kinematics Loop */}
          <g transform="translate(230, 60)">
            <circle cx="0" cy="0" r="24" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 2" className="text-accent animate-spin" />
            <text x="0" y="-2" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">Vision</text>
            <text x="0" y="10" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">&gt; 60 FPS</text>
          </g>
        </svg>
      )}

      {normId.includes("ida") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* Medical Interaction Discovery & Pharmacy Geolocation */}
          <g transform="translate(70, 60)">
            <rect x="-18" y="-18" width="36" height="36" rx="6" stroke="currentColor" strokeWidth="1.4" className="text-accent" fill="currentColor" fillOpacity="0.1" />
            <path d="M0 -10 V 10 M-10 0 H 10" stroke="currentColor" strokeWidth="2.5" className="text-accent" strokeLinecap="round" />
            <text x="0" y="30" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">Clinical Rx</text>
          </g>

          <path d="M98 60 H 170" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" className="text-accent" />

          {/* Geolocation Stock Radar */}
          <g transform="translate(210, 60)">
            <circle cx="0" cy="0" r="28" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
            <circle cx="0" cy="0" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            <circle cx="0" cy="0" r="5" fill="currentColor" className="text-accent" />
            <circle cx="10" cy="-8" r="3" fill="currentColor" opacity="0.8" />
            <circle cx="-12" cy="10" r="3" fill="currentColor" opacity="0.8" />
            <text x="0" y="42" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" className="font-mono text-accent">
              Pharmacy Discovery
            </text>
          </g>
        </svg>
      )}

      {normId.includes("datapilot") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* SHAP Feature Importance & Explainability Waterfall */}
          <g transform="translate(40, 30)">
            <text x="0" y="0" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">Feature A</text>
            <rect x="50" y="-8" width="70" height="10" rx="2" fill="currentColor" className="text-accent" />
            <text x="125" y="0" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.8">+0.42</text>

            <text x="0" y="20" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">Feature B</text>
            <rect x="50" y="12" width="45" height="10" rx="2" fill="currentColor" className="text-accent opacity-75" />
            <text x="100" y="20" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.8">+0.28</text>

            <text x="0" y="40" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">Feature C</text>
            <rect x="25" y="32" width="25" height="10" rx="2" fill="currentColor" opacity="0.4" />
            <text x="5" y="40" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.8">-0.15</text>
          </g>

          <g transform="translate(230, 60)">
            <rect x="-30" y="-22" width="60" height="44" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" />
            <text x="0" y="-3" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">SHAP</text>
            <text x="0" y="10" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">Audit PDF</text>
          </g>
        </svg>
      )}

      {normId.includes("candidateflow") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* Resume Ingestion & Recruiter Structuring Pipeline */}
          <g transform="translate(60, 60)">
            <rect x="-20" y="-25" width="40" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
            <line x1="-12" y1="-14" x2="12" y2="-14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="-12" y1="-6" x2="12" y2="-6" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="-12" y1="2" x2="6" y2="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <text x="0" y="38" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">Unstructured</text>
          </g>

          <path d="M90 60 H 160" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" className="text-accent" />

          <g transform="translate(210, 60)">
            <rect x="-35" y="-25" width="70" height="50" rx="5" stroke="currentColor" strokeWidth="1.4" className="text-accent" fill="currentColor" fillOpacity="0.1" />
            <text x="0" y="-8" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">Recruiter</text>
            <text x="0" y="4" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">Profile</text>
            <text x="0" y="16" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">Extracted JSON</text>
          </g>
        </svg>
      )}

      {normId.includes("indiecrop") && (
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full max-w-[300px] text-foreground p-3"
          fill="none"
        >
          {/* Agriculture Sensor Telemetry & Blockchain Verification */}
          <g transform="translate(70, 60)">
            <circle cx="0" cy="0" r="22" stroke="currentColor" strokeWidth="1.4" className="text-accent" fill="currentColor" fillOpacity="0.1" />
            <path d="M-8 8 C -8 -8, 8 -8, 8 8 Z" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
            <text x="0" y="34" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">Field Telemetry</text>
          </g>

          <path d="M100 60 H 165" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" className="text-accent" />

          <g transform="translate(210, 60)">
            <rect x="-35" y="-20" width="70" height="40" rx="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" />
            <text x="0" y="-3" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-semibold">FAO / NGO</text>
            <text x="0" y="10" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">Policy Dashboard</text>
          </g>
        </svg>
      )}

      {/* Default fallback if unmapped */}
      {!normId.includes("omniq") &&
        !normId.includes("medscope") &&
        !normId.includes("atlas") &&
        !normId.includes("shieldguard") &&
        !normId.includes("surf") &&
        !normId.includes("suno") &&
        !normId.includes("ida") &&
        !normId.includes("datapilot") &&
        !normId.includes("candidateflow") &&
        !normId.includes("indiecrop") && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>{name} System Architecture</span>
          </div>
        )}
    </div>
  )
}
