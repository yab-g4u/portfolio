"use client"

export function About() {
  return (
    <section id="about">
      <div className="head">
        <div className="ghost" aria-hidden="true">
          ABOUT
        </div>
        <h2 className="glow rv">About</h2>
        <div className="bar" />
      </div>

      <div className="about rv">
        <p className="lead">
          I&rsquo;m an engineer who enjoys turning complex ideas into reliable, working software.
        </p>
        <p>
          Most of my work centers around AI systems, multi-agent coordination, voice infrastructure,
          and full-stack software. I&rsquo;m drawn to messy real-world problems where the solution
          isn&rsquo;t obvious and where engineering rigor matters more than demo hype.
        </p>
        <p>I learn by building, breaking, and refining systems in production.</p>
      </div>

      <div className="grid-cards" style={{ marginTop: "44px" }}>
        <div className="dom card g3 rv">
          <h3>Building</h3>
          <p>AI systems and developer infrastructure.</p>
        </div>
        <div className="dom card g3 rv">
          <h3>Exploring</h3>
          <p>Agentic AI, voice interfaces &amp; multimodal systems.</p>
        </div>
        <div className="dom card g3 rv">
          <h3>Learning</h3>
          <p>Distributed architectures &amp; advanced AI systems.</p>
        </div>
      </div>
    </section>
  )
}
