"use client"

import { Trophy, Briefcase, Award } from "lucide-react"

export function ExperienceAchievements() {
  const experiences = [
    {
      company: "AI/ML Technical Lead",
      role: "Technical Lead & Community Mentor",
      period: "2025 – Present",
      description:
        "Leading technical leadership initiatives, AI/ML education curriculum, mentoring developers, and guiding engineering teams to ship production-ready projects.",
    },
    {
      company: "Lyne Creatives",
      role: "Lead Software Engineer",
      period: "August 2025 – August 2026",
      description:
        "Architected core application platforms, full-stack microservices, and high-performance workflows for digital systems.",
    },
    {
      company: "iCog Labs",
      role: "AI / Engineering Role",
      period: "July 2024 – October 2025",
      description:
        "Engineered applied machine learning models, neural architectures, and intelligent software systems.",
    },
  ]

  const achievements = [
    {
      title: "UniHack / Agent.ai Track",
      award: "Winner (1st Place)",
      detail: "IDA — Clinical Safety & Medical Intelligence Platform (Awarded 33,333 ETB)",
    },
    {
      title: "African Blockchain Championship",
      award: "2nd Place",
      detail: "Medscope — Multi-Agent Epidemic Coordination System",
    },
    {
      title: "Hospitality Hackathon",
      award: "Finalist",
      detail: "High-Throughput Digital Transactional Architecture & Systems",
    },
  ]

  return (
    <section id="experience" className="py-12 border-t border-border">
      <div className="space-y-12">
        {/* Experience Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-accent" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Experience & Roles
            </h2>
          </div>

          <div className="space-y-6 divide-y divide-border/60">
            {experiences.map((exp) => (
              <div key={exp.company + exp.period} className="pt-6 first:pt-0 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-sm font-semibold text-foreground">
                    <span>{exp.company}</span>
                    <span className="text-muted-foreground font-normal"> · {exp.role}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons & Distinctions */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Distinctions & Hackathons
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {achievements.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded-lg bg-secondary/30 border border-border/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:border-foreground/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border text-foreground font-semibold">
                      {item.award}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
