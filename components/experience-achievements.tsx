"use client"

const EXPERIENCES = [
  {
    title: "GDG on Campus AASTU · AI/ML Technical Lead",
    period: "2025 – Present",
    description:
      "Lead AI/ML technical direction for the campus developer community, guiding members through practical agentic AI, computer vision, and ML project development. Mentor student developers on building and shipping working AI systems.",
  },
  {
    title: "Lyne Creatives · Software Lead",
    period: "August 2025 – August 2026",
    description:
      "Led development of a collaborative workspace platform for an architectural firm, enabling internal teams to manage projects and communicate directly with clients. Architected core collaboration and microservice workflows end-to-end.",
  },
  {
    title: "iCog Labs · AI Research Intern, Applied Machine Learning",
    period: "July 2024 – October 2025",
    description:
      "Conducted applied machine learning research and experimentation as part of iCog Labs' quantum computing research team. Built and evaluated ML models and data pipelines supporting ongoing research.",
  },
]

const DISTINCTIONS = [
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

export function ExperienceAchievements() {
  return (
    <section id="experience">
      <div className="head">
        <div className="ghost" aria-hidden="true">
          EXPERIENCE
        </div>
        <h2 className="glow rv">Experience &amp; Roles</h2>
        <div className="bar" />
      </div>

      <div className="two">
        <div id="exp">
          {EXPERIENCES.map((exp) => (
            <div key={exp.title} className="tl rv">
              <b>{exp.title}</b>
              <small>{exp.period}</small>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div id="dist">
          <h3
            className="rv"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "30px",
              marginBottom: "16px",
              fontWeight: 400,
            }}
          >
            Distinctions &amp; Hackathons
          </h3>
          {DISTINCTIONS.map((item) => (
            <div key={item.title} className="tl rv">
              <b>{item.title}</b>
              <small>{item.award}</small>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
