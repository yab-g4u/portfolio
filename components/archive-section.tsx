"use client"

import { NeuralBackground } from "./neural-background"

const caseStudies = [
  {
    id: 1,
    title: "E-COMMERCE_PLATFORM",
    year: "2024",
    description: "Built scalable marketplace handling 50K+ daily transactions",
    impact: ["3x Performance Boost", "99.99% Uptime", "$2M+ Revenue"],
    stack: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
  },
  {
    id: 2,
    title: "HEALTHCARE_AI",
    year: "2023",
    description: "ML-powered diagnostic tool for medical imaging analysis",
    impact: ["96% Accuracy", "1000+ Patients", "FDA Approved"],
    stack: ["TensorFlow", "React", "FastAPI", "GCP"],
  },
  {
    id: 3,
    title: "FINTECH_DASHBOARD",
    year: "2023",
    description: "Real-time analytics platform for financial data visualization",
    impact: ["Sub-100ms Latency", "10M+ Data Points", "SOC 2 Compliant"],
    stack: ["React", "Node.js", "Redis", "WebSocket"],
  },
]

export function ArchiveSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden">
      <NeuralBackground opacity={0.06} nodeCount={20} />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 03"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">CASE ARCHIVE</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide max-w-2xl">
            Deployed solutions that scale. Real impact measured in performance, reliability, and user satisfaction.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="border-2 border-white/40 bg-black/60 backdrop-blur-sm hover:border-white transition-all duration-75 group"
            >
              <div className="p-4 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2">
                      [CASE_{String(index + 1).padStart(3, "0")}] // {study.year}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 tracking-wide">{study.title}</h3>
                    <p className="text-xs md:text-base text-white/70 leading-relaxed mb-4 md:mb-6">
                      {study.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                  {study.impact.map((item) => (
                    <div key={item} className="border border-white/40 p-2 md:p-3 text-center text-xs md:text-sm">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] md:text-xs text-white/60 tracking-wider mr-2">STACK:</span>
                  {study.stack.map((tech) => (
                    <span key={tech} className="text-[10px] md:text-xs border border-white/40 px-2 py-1 tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
