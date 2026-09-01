"use client"

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
    <section className="py-12 border-t border-border">
      <div className="space-y-12">
        {/* Experience Section */}
        <div className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Experience
          </h2>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.company + exp.period} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-sm font-semibold text-foreground">
                    <span>{exp.company}</span>
                    <span className="text-muted-foreground font-normal"> · {exp.role}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership / Community Section */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Leadership & Community
          </h2>
          <div className="p-4 rounded bg-secondary/30 border border-border text-xs text-muted-foreground leading-relaxed space-y-1">
            <div className="font-semibold text-foreground">
              AI/ML Technical Lead & Instructor (2025 – Present)
            </div>
            <p>
              Directing technical curriculum, hosting hands-on workshops in machine learning, agentic architectures, and full-stack software development. Mentoring aspiring developers through open-source contributions and production project delivery.
            </p>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-6 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            A few things I&apos;ve done
          </h2>

          <div className="space-y-4">
            {achievements.map((ach) => (
              <div key={ach.title} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-foreground">
                    {ach.title}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ach.detail}
                  </p>
                </div>
                <span className="text-xs font-mono text-accent font-medium shrink-0">
                  {ach.award}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
