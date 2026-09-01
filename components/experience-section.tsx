"use client"

import { Briefcase, Calendar, MapPin, ArrowUpRight, Cpu, Users, Layers, Award } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      company: "iCog Labs",
      role: "AI Talent Program",
      period: "2026",
      location: "Addis Ababa, Ethiopia",
      type: "Research & Systems",
      bullets: [
        "Selected for competitive AI Talent Program focusing on applied neural architectures and machine learning systems.",
        "Engineered and benchmarked deep learning pipelines for structured data processing and natural language understanding.",
        "Collaborated on intelligent agent prototypes and evaluated inference latency optimization strategies.",
      ],
      tags: ["Machine Learning", "Neural Networks", "Python", "Inference Optimization"],
    },
    {
      company: "GDG Club — AASTU",
      role: "AI/ML Technical Lead & Instructor",
      period: "2024 — Present",
      location: "Addis Ababa Science & Technology University",
      type: "Technical Leadership",
      bullets: [
        "Leading AI/ML technical curriculum and hands-on developer workshops for engineering students.",
        "Mentoring student teams through competitive hackathons resulting in multiple national awards.",
        "Delivered technical deep-dives on LLM agent architectures, FastAPI service design, and vector databases.",
      ],
      tags: ["Technical Leadership", "Machine Learning", "Mentorship", "FastAPI", "LLMs"],
    },
    {
      company: "Lyne Creatives",
      role: "Lead Software Engineer",
      period: "2024 — 2025",
      location: "Addis Ababa, Ethiopia",
      type: "Platform Engineering",
      bullets: [
        "Architected complete company web platform and 15+ microservices for architectural 3D and project data handling.",
        "Optimized API pipelines and database querying to reduce client processing latency by 35%.",
        "Engineered proprietary team workspace module enabling real-time collaboration on design deliverables.",
      ],
      tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Redis", "Microservices"],
    },
    {
      company: "HD Electro-Mechanical Engineering",
      role: "Engineering Intern",
      period: "2023 — 2024",
      location: "Addis Ababa, Ethiopia",
      type: "Hardware & Systems",
      bullets: [
        "Applied electromechanical principles to automated control systems and physical hardware monitoring.",
        "Integrated sensor data with software dashboards for real-time electrical telemetry.",
        "Strengthened systems-first engineering mindset analyzing end-to-end hardware-software feedback loops.",
      ],
      tags: ["Control Systems", "Telemetry", "Electromechanical Analysis", "Automation"],
    },
  ]

  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>04 // BACKGROUND & ROLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Leadership
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Engineering roles, technical leadership, and real-world systems built.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={exp.company + exp.role}
              className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700/90 transition-colors space-y-4 backdrop-blur-sm"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-zinc-500 font-mono text-xs">@</span>
                    <span className="text-emerald-400 font-semibold font-mono text-sm sm:text-base">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span>·</span>
                    <span className="text-zinc-400">{exp.type}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-300 self-start sm:self-auto">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono mt-0.5">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Tags */}
              <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5 items-center">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
