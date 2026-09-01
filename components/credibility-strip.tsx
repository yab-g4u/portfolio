"use client"

import { Trophy, Award, Users, Cpu, ShieldCheck } from "lucide-react"

export function CredibilityStrip() {
  const credentials = [
    {
      icon: Trophy,
      title: "UniHack — Winner",
      detail: "1st Place · IDA Healthcare Platform",
      highlight: true,
    },
    {
      icon: Award,
      title: "African Blockchain Championship",
      detail: "2nd Place · Medscope Response System",
      highlight: true,
    },
    {
      icon: ShieldCheck,
      title: "Hospitality Hackathon",
      detail: "Finalist · Secure API Architecture",
      highlight: false,
    },
    {
      icon: Users,
      title: "AI/ML Technical Lead",
      detail: "GDG AASTU Community & Instructor",
      highlight: false,
    },
    {
      icon: Cpu,
      title: "AI Talent Program",
      detail: "iCog Labs (2026)",
      highlight: false,
    },
  ]

  return (
    <section className="bg-zinc-950/90 border-b border-zinc-800/80 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {credentials.map((cred) => {
            const Icon = cred.icon
            return (
              <div
                key={cred.title}
                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/90 transition-colors"
              >
                <div className="p-1.5 rounded bg-zinc-800/80 text-emerald-400 mt-0.5 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-zinc-200 truncate">{cred.title}</div>
                  <div className="text-[11px] text-zinc-400 truncate mt-0.5">{cred.detail}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
