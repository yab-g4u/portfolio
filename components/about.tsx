"use client"

export function About() {
  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-10">
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            About
          </h2>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              I&apos;m an engineer who enjoys turning complex ideas into reliable, working software.
            </p>
            <p>
              Most of my work centers around AI systems, multi-agent coordination, voice infrastructure, and full-stack software. I&apos;m drawn to messy real-world problems where the solution isn&apos;t obvious and where engineering rigor matters more than demo hype.
            </p>
            <p className="text-foreground font-medium">
              I learn by building, breaking, and refining systems in production.
            </p>
          </div>
        </div>

        {/* Currently Section */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Currently
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded bg-secondary/30 border border-border space-y-1">
              <span className="font-mono text-muted-foreground uppercase text-[10px] block">
                Building
              </span>
              <p className="text-foreground font-medium">
                AI systems and developer infrastructure.
              </p>
            </div>

            <div className="p-3 rounded bg-secondary/30 border border-border space-y-1">
              <span className="font-mono text-muted-foreground uppercase text-[10px] block">
                Exploring
              </span>
              <p className="text-foreground font-medium">
                Agentic AI, voice interfaces & multimodal systems.
              </p>
            </div>

            <div className="p-3 rounded bg-secondary/30 border border-border space-y-1">
              <span className="font-mono text-muted-foreground uppercase text-[10px] block">
                Learning
              </span>
              <p className="text-foreground font-medium">
                Distributed architectures & advanced AI systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
